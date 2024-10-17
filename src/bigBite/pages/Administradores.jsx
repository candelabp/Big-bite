import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/administradores.css';
import userimage from '../assets/benavides-geronimo-image.webp';
import { Footer } from '../components/Footer';
import { NavBar } from '../components/NavBarRojo';

export const Administradores = () => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const password = watch("password");

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isAddingAdmin, setIsAddingAdmin] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [isViewAdmin, setIsViewAdmin]=useState(false);

    const admins = [
      { id: 1, image: userimage, name: "Jane Doe", role: "Admin" },
      { id: 2, image: userimage, name: "John Smith", role: "Admin" },
      { id: 3, image: userimage, name: "Marcos Diaz", role: "Admin" },
      { id: 4, image: userimage, name: "Maria Marquez", role: "Admin" }
    ];

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
        <NavBar/>
    
        {/* Parte Superior */}
        <div className="top-section">
          <div className="admin-info">
            <div className="admin-avatar">
              <img src={userimage} alt="" />
            </div>
            <div>
              <h1>Agregar Nuevo Admin</h1>
              <p>Rol: Admin</p>
            </div>
          </div>
          <div className="admin-actions">
            <button className="add-button" onClick={handleAddAdmin}>Agregar Admin</button>
          </div>
        </div>
    
        {/* Parte Media */}
        <div className="middle-section">
          <div className='zona-media-izquierda'>
            <h1>Administradores Actuales</h1>
            <div className="admin-actions-left">
              {selectedAdmin && (
                <>
                  <button className="delete-button">Borrar Admin</button>
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
              <h1>Detalles Admin</h1>
            </div>
            <div className='zona-baja-der'>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Ingrese el nombre" defaultValue={selectedAdmin?.name || ''} />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input type="text" placeholder="Ingrese el telefono" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Ingrese el Email" />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <div className="role-options">
                  <button 
                    className={`role-button ${selectedRole === 'Admin' ? 'selected' : ''}`} 
                    onClick={() => handleRoleSelect('Admin')}
                  >Admin</button>
                  <button 
                    className={`role-button ${selectedRole === 'Client' ? 'selected' : ''}`} 
                    onClick={() => handleRoleSelect('Client')}
                  >Cliente</button>
                </div>
              </div>
              <div className="form-actions">
                <button className="cancel-button" onClick={handleRemoveAdmin}>Cancelar</button>
                <button className="save-button">Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}
    
        {(isAddingAdmin) && (
          <form onSubmit={handleSubmit(onSubmit)} className="bottom-section form-admin">
            <div className='zona-baja-izq'>
              <h1>Detalles Admin</h1>
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
                  accept="image/*"
                  {...register("imagen", { required: "La imagen es obligatoria" })}
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
    
              <div className="form-group">
                <label>Rol</label>
                <div className="role-options">
                  <button 
                    className={`role-button ${selectedRole === 'Admin' ? 'selected' : ''}`} 
                    onClick={() => handleRoleSelect('Admin')}
                  >Admin</button>
                  <button 
                    className={`role-button ${selectedRole === 'Client' ? 'selected' : ''}`} 
                    onClick={() => handleRoleSelect('Client')}
                  >Cliente</button>
                </div>
              </div>
    
              <div className="form-actions">
                <button className="cancel-button" onClick={handleRemoveAdmin}>Cancelar</button>
                <button type="submit" className="save-button">Guardar Admin</button>
              </div>
            </div>
          </form>
        )}
    
        <Footer />
      </div>
    );
    
};
