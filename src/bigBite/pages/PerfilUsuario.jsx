import React, { useState } from 'react';
import '../css/perfilUsuario.css';
import IconoEditar from '../assets/editar.svg';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBarRojo';

export const PerfilUsuario = () => {
  const [imageSrc, setImageSrc] = useState('https://www.latercera.com/resizer/v2/B62GHN4X35BKPHABQ7A2MN7GGE.png?quality=80&smart=true&auth=d695ccedad5ca57992737e94c93fd6e5a9432636bc40ab803fd108a52cbc52e6&width=1200&height=800');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <>
        <NavBar />
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
              <input className='input-perfil' />
              <img src={IconoEditar} alt="Editar nombre" className="svg-editar"/>
            </div>
            <div className='campo-perfil'>
              <label className='label-perfil'>Apellido:</label>
              <input className='input-perfil' />
              <img src={IconoEditar} alt="Editar apellido" className="svg-editar"/>
            </div>
            <div className='campo-perfil'>
              <label className='label-perfil'>Email:</label>
              <input className='input-perfil' />
              <img src={IconoEditar} alt="Editar email" className="svg-editar"/>
            </div>
            <div className='campo-perfil'>
              <label className='label-perfil'>Telefono:</label>
              <input className='input-perfil' />
              <img src={IconoEditar} alt="Editar telefono" className="svg-editar"/>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </>
  );
};
