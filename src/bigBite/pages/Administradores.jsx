import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/administradores.css';
import userimage from '../assets/benavides-geronimo-image.webp';
import francorinaldiimage from '../assets/franco-rinaldi.jpg';
import chiquiimage from '../assets/chiqui-tapion.jpg';
import julianalvarezimage from '../assets/julian-alvarez.jpg';
import senseiclossimage from '../assets/sensei-closs.jpg';
import messiimage from '../assets/messi.jpg';
import maslatonimage from '../assets/maslaton.jpg';
import cobriximage from '../assets/cobrix.jpg';
import NavbarAdmin from '../components/NavbarAdmin';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
// import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import { UserContext } from '../../context/UserContext';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Para generar un UID único


export const Administradores = () => {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch("password");

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [isViewAdmin, setIsViewAdmin] = useState(false);
  const [admins, setAdmins] = useState([]);
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);
  // Estado local para los campos del formulario


  // Función para obtener usuarios con rol 'empleado'
  const getEmpleados = async () => {
    try {
      const q = query(collection(FirebaseDB, "usuarios"), where("rol", "==", "empleado"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const empleados = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          return {
            id: doc.id,
            photoURL: userData.photoURL || '',
            telefono: userData.telefono || '',
            displayName: `${userData.nombre} ${userData.apellido}`,
            nombre: userData.nombre || '',
            apellido: userData.apellido || '',
            rol: userData.rol || '',
            email: userData.email || ''
          };
        });
        console.log('Empleados obtenidos:', empleados);
        return empleados;
      } else {
        console.log("No se encontraron usuarios con el rol 'empleado'.");
        return [];
      }
    } catch (error) {
      console.error("Error al buscar los usuarios:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const empleados = await getEmpleados();
        const formattedAdmins = empleados.map((admin, index) => ({
          id: admin.id,
          name: admin.displayName,
          image: admin.photoURL,
          nombre: admin.nombre,
          apellido: admin.apellido,
          rol: admin.rol,
          telefono: admin.telefono,
        }));
        setAdmins(formattedAdmins);
      } catch (error) {
        console.error("Error al obtener la información de los empleados:", error);
      }
    };

    fetchEmpleados();
  }, []);

  // Inicializar `formData` solo cuando `selectedAdmin` cambie

  useEffect(() => {
    if (selectedAdmin) {
      reset({
        nombre: selectedAdmin.nombre || '',
        apellido: selectedAdmin.apellido || '',
        telefono: selectedAdmin.telefono || '',
        email: selectedAdmin.email || ''
      });
    }
  }, [selectedAdmin, reset]);



  // Guardar cambios en Firestore
  const handleSaveChanges = async (data) => {
    console.log('handleSaveChanges ejecutado');
    console.log('Datos del formulario:', data);

    if (selectedAdmin?.id) {
      const adminDocRef = doc(FirebaseDB, `usuarios/${selectedAdmin.id}`);
      const displayName = `${data.nombre} ${data.apellido}`;
      console.log('Referencia del documento:', adminDocRef.path);
      console.log('Datos a actualizar:', {
        displayName,
        telefono: data.telefono,
      });

      try {
        await setDoc(adminDocRef, {
          displayName,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
        }, { merge: true });

        // Obtener el documento actualizado
        const updatedDoc = await getDoc(adminDocRef);
        if (updatedDoc.exists()) {
          console.log('Documento actualizado:', updatedDoc.data());
        } else {
          console.log('El documento no existe.');
        }

        // Actualizar el estado `admins`
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.id === selectedAdmin.id
              ? { ...admin, name: displayName, nombre: data.nombre, apellido: data.apellido, telefono: data.telefono, email: data.email }
              : admin
          )
        );

        // Mostrar mensaje de éxito
        alert('Los cambios se han guardado correctamente.');
      } catch (error) {
        // Mostrar mensaje de error
        console.error('Error al guardar los cambios:', error);
        alert('Hubo un error al guardar los cambios. Por favor, inténtalo de nuevo.');
      }
    } else {
      console.error('selectedAdmin.id no está definido');
    }
  };

  // Cambiar el rol del empleado a 'empleadoInactivo'
  const handleDeleteAdmin = async () => {
    if (selectedAdmin?.id) {
      const adminDocRef = doc(FirebaseDB, `usuarios/${selectedAdmin.id}`);
      try {
        await setDoc(adminDocRef, { rol: 'empleadoInactivo' }, { merge: true });

        // Filtrar el empleado inactivo del estado `admins`
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== selectedAdmin.id)
        );

        // Mostrar mensaje de éxito
        alert('El empleado ha sido marcado como inactivo.');
      } catch (error) {
        console.error('Error al cambiar el rol del empleado:', error);
        alert('Hubo un error al cambiar el rol del empleado. Por favor, inténtalo de nuevo.');
      }
    } else {
      console.error('selectedAdmin.id no está definido');
    }
  };

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      console.log(file);
    } else {
      alert('Por favor selecciona un archivo de imagen válido.');
    }
  };

  // Función para manejar la subida de la imagen
  const handleImageUpload = async (userId) => {

    if (!image) {
      // Si no hay imagen, resolver la promesa con una cadena vacía
      // console.log('sin imagen');
      return '';
    }

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
          // console.error('Error al subir la imagen:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
          // console.log('URL de la imagen:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };



 // Función para registrar un empleado
 const handleRegisterEmpleado = async (data) => {
  const { email, password, nombre, apellido, telefono } = data;

  try {
    // Generar un UID único para el usuario
    const userId = uuidv4();
    console.log(userId)

    // Subir la imagen a Firebase Storage
    const imageURL = await handleImageUpload(userId);

    // Guardar el usuario en Firestore
    const newDoc = doc(FirebaseDB, `usuarios/${userId}`);
   
    await setDoc(newDoc, {
      rol: 'empleado',
      displayName: `${nombre} ${apellido}`,
      nombre,
      apellido,
      telefono,
      email,
      photoURL: imageURL || '',
      password // Guardar la contraseña en Firestore (no recomendado para producción)
    });

    // Actualizar el estado `admins` para incluir el nuevo empleado
    const newAdmin = {
      id: userId,
      displayName: `${nombre} ${apellido}`,
      nombre,
      apellido,
      telefono,
      email,
      photoURL: imageURL || '',
      rol: 'empleado'
    };
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);

    // Limpiar los campos del formulario
    reset();

    // Recargar la página
    window.location.reload();

    // Mostrar mensaje de éxito
    alert('El usuario ha sido registrado correctamente.');
  } catch (error) {
    console.error('Error durante el registro:', error);
    alert('Hubo un error durante el registro. Por favor, inténtalo de nuevo.');
  }
};

  const handleSelectAdmin = (admin) => {
    setSelectedAdmin(admin);
    setIsAddingAdmin(false);
    setIsViewAdmin(false);
  };

  const handleViewAdmin = (admin) => {
    setSelectedAdmin(admin);
    setIsViewAdmin(true);
    setIsAddingAdmin(false);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleAddAdmin = () => {
    setSelectedAdmin(null);
    setIsAddingAdmin(true);
    setIsViewAdmin(false);
  };

  const handleRemoveAdmin = () => {
    setSelectedAdmin(null);
    setIsAddingAdmin(false);
    setIsViewAdmin(false);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('usuario', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));
    formData.append('imagenPerfil', data.imagen[0]);

    fetch('http://localhost:8080/usuarios/registrar', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => { throw new Error(text); });
        }
        return response.text();
      })
      .then((message) => {
        console.log('Respuesta del servidor:', message);
        alert(message);
      })
      .catch((error) => {
        console.error('Hubo un error:', error);
        alert(error.message);
      });
  };

  return (
    <div className="app-container">
      <NavbarAdmin></NavbarAdmin>
      {/* Parte Superior */}
      <div className="top-section">
        <div className="admin-info">
          <div className="admin-avatar">
            <img src={user.photoURL} alt="" />
          </div>
          <div>
            <h1>{user.displayName} </h1>
            <p>Rol: Admin</p>
          </div>
        </div>
        <div className="admin-actions">
          <button className="add-button" onClick={handleAddAdmin}>Agregar Empleado</button>
        </div>
      </div>

      {/* Parte Media */}
      <div className="middle-section">
        <div className='zona-media-izquierda'>
          <h1>Empleados actuales</h1>
          <div className="admin-actions-left">
            {selectedAdmin && (
              <>
                <button className="delete-button" onClick={handleDeleteAdmin}>Borrar Empleado</button>
                <button className="view-button" onClick={() => handleViewAdmin(selectedAdmin)}>Ver Detalles</button>
              </>
            )}
          </div>
        </div>

        <div className="admin-list">
          <div className="admin-list-right">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className={`admin-item ${selectedAdmin?.id === admin.id ? 'selected' : ''}`}
                onClick={() => handleSelectAdmin(admin)}
              >
                <div className="admin-avatar">
                  <img src={admin.image} alt="" />
                </div>
                <div>
                  <p>{admin.name}</p>
                  <span>{admin.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulario de Agregar Admin o ver datos */}
      {(isAddingAdmin || isViewAdmin) && (
        <div className='linea'>
          <hr />
        </div>
      )}

      {(isViewAdmin) && (
        <div className="bottom-section">
          <div className='zona-baja-izq'>
            <h1>Detalles Empleado</h1>
          </div>
          <div className='zona-baja-der'>
            <form onSubmit={handleSubmit(handleSaveChanges)}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ingrese el nombre"
                  {...register('nombre')}
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Ingrese el apellido"
                  {...register('apellido')}
                />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input
                  type="text"
                  name="telefono"
                  placeholder="Ingrese el telefono"
                  {...register('telefono')}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(isAddingAdmin) && (
        <form onSubmit={handleSubmit(handleRegisterEmpleado)} className="bottom-section form-admin">
          <div className='zona-baja-izq'>
            <h1>Detalles Empleado</h1>
          </div>
          <div className='zona-baja-der'>
            <div className="form-group">
              <label>Nombre:</label>
              <input {...register("nombre", { required: "El nombre es obligatorio" })} />
              {errors.nombre && <span>{errors.nombre.message}</span>}
            </div>

            <div className="form-group">
              <label>Apellido:</label>
              <input {...register("apellido", { required: "El apellido es obligatorio" })} />
              {errors.apellido && <span>{errors.apellido.message}</span>}
            </div>

            <div className="form-group">
              <label>Telefono:</label>
              <input {...register("telefono", { required: "El telefono es obligatorio" })} />
              {errors.telefono && <span>{errors.telefono.message}</span>}
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label>Imagen de perfil:</label>
              <input
                type="file"
                onChange={handleImageChange}

              />
              {errors.imagen && <span>{errors.imagen.message}</span>}
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-actions">
              <button className="cancel-button" onClick={handleRemoveAdmin}>Cancelar</button>
              <button type="submit" className="save-button">Guardar Admin</button>
            </div>
          </div>
        </form>
      )}


    </div>
  );

};
