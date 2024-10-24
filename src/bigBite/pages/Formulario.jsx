import '../css/formulario.css';
import { useForm } from "react-hook-form";

import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import { FirebaseApp, FirebaseAuth, FirebaseDB } from '../../firebase/config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';

import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext, useState } from 'react';


export const Formulario = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch("password");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);


  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Por favor selecciona un archivo de imagen válido.');
    }
  };

  // Función para manejar la subida de la imagen
  const handleImageUpload = async (userId) => {
    
    const storage = getStorage();
    const storageRef = ref(storage, `profile-images/${userId}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressPercent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent);
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
          console.log('URL de la imagen:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };
  


  const handleRegister = async (data) => {
    const auth = getAuth();
    const { email, password, nombre, apellido, telefono } = data;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

    
      // Subir la imagen a Firebase Storage
      const imageURL = await handleImageUpload(user.uid);

      // Actualizar el perfil del usuario
      await updateProfile(user, {
        displayName: `${nombre} ${apellido}`,
        photoURL: `${imageURL}`,
        phoneNumber: `${telefono}`
      });

       // Guardar el usuario en Firestore
       const newDoc = doc(FirebaseDB, `users/${user.uid}/profile/info`);
       await setDoc(newDoc, {
         nombre,
         apellido,
         telefono,
         email,
         photoURL: imageURL
       });
       


      console.log('User Info:', user);
      // Aquí puedes guardar el usuario en el estado o hacer cualquier otra cosa necesaria

      setUser(result.user);
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  const handleLogin = async () => {
    const auth = getAuth(FirebaseApp);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // El usuario ha iniciado sesión con éxito
      console.log('User Info:', result.user);
      console.log('user name:', result.user.displayName);
      console.log('userphoto:', result.user.photoURL);
      setUser(result.user);
      navigate('/')
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };


    return (
      <div>
        <NavBarBlanco />
        <div className='titulo-form'>
          <h1>Formulario de registro</h1>
        </div>
        <div className='formulario'>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div>
              <label>Nombre:</label>
              <input {...register("nombre", { required: "El nombre es obligatorio" })} />
              {errors.nombre && <span>{errors.nombre.message}</span>}
            </div>

            <div>
              <label>Apellido:</label>
              <input {...register("apellido", { required: "El apellido es obligatorio" })} />
              {errors.apellido && <span>{errors.apellido.message}</span>}
            </div>

            <div>
              <label>Telefono:</label>
              <input {...register("telefono", { required: "El telefono es obligatorio" })} />
              {errors.telefono && <span>{errors.telefono.message}</span>}
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email no válido",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
              <label>Imagen de perfil:</label>
              <input
                type="file"
                onChange={handleImageChange}
              />
              {errors.imagen && <span>{errors.imagen.message}</span>}
            </div>

            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div>
              <label>Repetir contraseña:</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Debes repetir la contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>

            <div className="formulario-buttons">
              <button type="submit" className='boton-enviar'>Registrar</button>
              <button type="button" className='boton-reset' onClick={() => reset()}>Limpiar</button>
            </div>
            <div>
              <button type="button" className='boton-google' onClick={handleLogin}>Registrarse con <i className="bi bi-google"></i>oogle</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  };
