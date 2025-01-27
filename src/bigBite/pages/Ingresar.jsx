import '../css/ingresar.css';
import { useContext, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FirebaseApp } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';
import IconoOcultarPW from '../assets/svg/ojo-abierto.svg';
import IconoMostrarPW from '../assets/svg/ojo-cerrado.svg';
import Swal from 'sweetalert2';

export const Ingresar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const auth = getAuth(FirebaseApp);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // El usuario ha iniciado sesión con éxito
      console.log('User Info:', result.user);
      setUser(result.user);

      // Verificar el rol del usuario en Firestore
      const db = getFirestore();
      const userDoc = await getDocs(query(collection(db, 'usuarios'), where('email', '==', result.user.email)));
      if (!userDoc.empty) {
        const userData = userDoc.docs[0].data();
        console.log(userData)
        if (userData.rol === 'admin' || userData.rol === 'empleado') {
          navigate('/AdminPpal');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:'Error iniciando sesión, inténtelo de nuevo',
      });
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    try {
      // Buscar el usuario en Firestore por correo
      const q = query(collection(db, 'usuarios'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Verificar la contraseña
        if (userData.password === password) {
          // Establecer el usuario en setUser
          const user = {
            uid: userDoc.id,
            ...userData
          };

          console.log(userData)

          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);

          // Redirigir según el rol del usuario
          if (userData.rol === 'admin' || userData.rol === 'empleado') {
            navigate('/AdminPpal')
          } else {
            navigate('/')
          }
        } else {
          setErrorMessage('Contraseña incorrecta.');
        }
      } else {
        setErrorMessage('No se encontró un usuario con ese correo.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:'Error iniciando sesión, inténtelo de nuevo',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavBarBlanco />

      <div className='form-container'>
        <form className="inicio-sesion" onSubmit={handleLoginWithEmail}>
          <label htmlFor="email"><b>Email</b></label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password"><b>Contraseña</b></label>
          <div className='campo-contrasenia'>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? IconoOcultarPW : IconoMostrarPW}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="icono-mostrar-contrasenia"
              onClick={togglePasswordVisibility}
            />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="div-btns">
            <button type="submit" className="ingresar-btn">Ingresar</button>
            <button type="button" className='loginGoogle-btn' onClick={handleLoginWithGoogle}>Iniciar con <i className="bi bi-google"></i>oogle</button>
            <button
              className="cont-btn"
              type="button"
              onClick={() => alert("Recuperar contraseña")}
            >
              Olvidé mi contraseña
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
