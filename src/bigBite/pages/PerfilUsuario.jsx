import React, { useState, useEffect, useContext } from 'react';
import '../css/perfilUsuario.css';
import IconoEditar from '../assets/svg/editar.svg';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBarRojo';
import { UserContext } from '../../context/UserContext';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import Swal from 'sweetalert2';

export const PerfilUsuario = () => {
  const { user, setUser } = useContext(UserContext);
  const db = getFirestore();

  const [imageSrc, setImageSrc] = useState(user.photoURL || 'https://www.latercera.com/resizer/v2/B62GHN4X35BKPHABQ7A2MN7GGE.png?quality=80&smart=true&auth=d695ccedad5ca57992737e94c93fd6e5a9432636bc40ab803fd108a52cbc52e6&width=1200&height=800');
  const [nombre, setNombre] = useState(user.nombre || 'Nombre de ejemplo');
  const [apellido, setApellido] = useState(user.apellido || 'Apellido de ejemplo');
  const [email, setEmail] = useState(user.email || 'email@ejemplo.com');
  const [telefono, setTelefono] = useState(user.telefono || '123456789');

  const [editing, setEditing] = useState({
    nombre: false,
    apellido: false,
    email: false,
    telefono: false,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [areFieldsValid, setAreFieldsValid] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setHasChanges(true); // Marcar que ha habido un cambio
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = (field) => {
    setEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSave = async () => {
    const userRef = doc(db, 'usuarios', user.uid);
    const updatedUser = {
      ...user,
      nombre,
      apellido,
      email,
      telefono,
      photoURL: imageSrc,
    };

    try {
      await updateDoc(userRef, updatedUser);
      setUser(updatedUser);
      setHasChanges(false);
      Swal.fire({
        icon: 'success',
        title: 'Edicion completada',
        text: 'Datos actualizados correctamente',
      });
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error actualizando los datos, inténtelo de nuevo',
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setImageSrc(userData.photoURL || 'https://www.latercera.com/resizer/v2/B62GHN4X35BKPHABQ7A2MN7GGE.png?quality=80&smart=true&auth=d695ccedad5ca57992737e94c93fd6e5a9432636bc40ab803fd108a52cbc52e6&width=1200&height=800');
        setNombre(userData.nombre || 'Nombre de ejemplo');
        setApellido(userData.apellido || 'Apellido de ejemplo');
        setEmail(userData.email || 'email@ejemplo.com');
        setTelefono(userData.telefono || '123456789');
      }
    };

    fetchUserData();
  }, [db, user.uid, setUser]);

  useEffect(() => {
    const originalValues = {
      nombre: user.nombre || 'Nombre de ejemplo',
      apellido: user.apellido || 'Apellido de ejemplo',
      email: user.email || 'email@ejemplo.com',
      telefono: user.telefono || '123456789',
      imageSrc: user.photoURL || 'https://www.latercera.com/resizer/v2/B62GHN4X35BKPHABQ7A2MN7GGE.png?quality=80&smart=true&auth=d695ccedad5ca57992737e94c93fd6e5a9432636bc40ab803fd108a52cbc52e6&width=1200&height=800',
    };

    const currentValues = {
      nombre,
      apellido,
      email,
      telefono,
      imageSrc,
    };

    const hasChanged = Object.keys(currentValues).some(
      (key) => currentValues[key] !== originalValues[key]
    );

    const areFieldsFilled = Object.values(currentValues).every(value => value.trim() !== '');

    setHasChanges(hasChanged);
    setAreFieldsValid(areFieldsFilled);
  }, [nombre, apellido, email, telefono, imageSrc, user]);

  return (
    <>
      <NavBar />
      <header className="admin-header">
        <h1>Mi Perfil</h1>
      </header>
      <h2>Administra tus datos personales</h2>
      <div className="user-container-principal">
        <div className='container-pfp'>
          <label htmlFor="pfp-upload" className="pfp-label">
            <img src={imageSrc} alt="Perfil" className="pfp-image" />
            <div className="pfp-overlay">Subir imagen</div>
          </label>
          <input
            id="pfp-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className='user-info-container'>
          <div className='campo-perfil'>
            <label className='label-perfil'>Nombre:</label>
            <input
              className={`input-perfil ${editing.nombre ? '' : 'read-only'}`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              readOnly={!editing.nombre}
            />
            <img
              src={IconoEditar}
              alt="Editar nombre"
              className="svg-editar"
              onClick={() => toggleEdit('nombre')}
            />
          </div>
          <div className='campo-perfil'>
            <label className='label-perfil'>Apellido:</label>
            <input
              className={`input-perfil ${editing.apellido ? '' : 'read-only'}`}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              readOnly={!editing.apellido}
            />
            <img
              src={IconoEditar}
              alt="Editar apellido"
              className="svg-editar"
              onClick={() => toggleEdit('apellido')}
            />
          </div>
          <div className='campo-perfil'>
            <label className='label-perfil'>Email:</label>
            <input
              className={`input-perfil ${editing.email ? '' : 'read-only'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editing.email}
            />
            <div className="svg-placeholder"></div>
          </div>
          <div className='campo-perfil'>
            <label className='label-perfil'>Telefono:</label>
            <input
              className={`input-perfil ${editing.telefono ? '' : 'read-only'}`}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              readOnly={!editing.telefono}
            />
            <img
              src={IconoEditar}
              alt="Editar telefono"
              className="svg-editar"
              onClick={() => toggleEdit('telefono')}
            />
          </div>
          <button className="btn-cambiar-contrasenia">Cambiar contraseña</button>
        </div>
      </div>

      <div className='container-botones-perfil'>
        <button type="button" className="btn-guardar-perfil" disabled={!hasChanges || !areFieldsValid} onClick={handleSave}>
          Guardar
        </button>
      </div>
      <Footer />
    </>
  );
};