import React, { useState } from 'react';
import '../css/perfilUsuario.css';

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
      </>
      
    </>
  );
};
