import { useState } from 'react';
import '../css/administradores.css'
import userimage from '../assets/benavides-geronimo-image.webp';
import { Footer } from '../components/Footer'; 
import { NavBar } from '../components/NavBarRojo';

export const Administradores = () => {

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isAddingAdmin, setIsAddingAdmin] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [isViewAdmin, setIsViewAdmin]=useState(false)
  
    const admins = [
      { id: 1,image:userimage , name: "Jane Doe", role: "Admin" },
      { id: 2,image:userimage , name: "John Smith", role: "Admin" },
      {id: 3,image:userimage , name: "Marcos Diaz", role: "Admin" },
      { id: 4,image:userimage , name: "Maria Marquez", role: "Admin" }
    ];
  
    const handleSelectAdmin = (admin) => {
        setSelectedAdmin(admin);
        setIsAddingAdmin(false)
        setIsViewAdmin(false)
      };
      
    const handleViewAdmin = (admin) => {
        setSelectedAdmin(admin); // Se establece el admin seleccionado
        setIsViewAdmin(true); // Asegúrate de que el formulario no esté abierto
    };
  
    const handleRoleSelect = (role) => {
        setSelectedRole(role); // Cambia el rol seleccionado
    };

    const handleAddAdmin = () => {
      setSelectedAdmin(null);
      setIsAddingAdmin(true);
      setIsViewAdmin(false)
    };
  
    const handleRemoveAdmin = () => {
      setSelectedAdmin(null);
      setIsAddingAdmin(false);
      setIsViewAdmin(false)
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
            <button className="btn add-btn" onClick={handleAddAdmin}>Agregar Admin</button>
          </div>
        </div>
  
        {/* Parte Media */}
        <div className="middle-section">
          <div className='zona-media-izquierda'> 
            <h1>Administradores Actuales</h1>
            <div className="admin-actions-left">
              {selectedAdmin && (
                <>
                  <button className="btn delete-btn">Borrar Admin</button>
                  <button className="btn view-btn" onClick={() => handleViewAdmin(selectedAdmin)}>
                  Ver Detalles
                </button>
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
  
        {/* Parte Inferior */}
        {(isAddingAdmin||isViewAdmin  ) && (
            <div className='linea'>
                <hr />
            </div>
        )}

        {(isAddingAdmin||isViewAdmin ) && (
            
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
                        <input type="email" placeholder="Ingrese el telefono" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Ingrese el Email" />
                    </div>
                    {(isAddingAdmin)&&(
                      <>
                        <div className="form-group">
                          <label>Subir Imagen</label>
                          <input type="file" accept="image/*" />
                        </div>
                        <div className="form-group">
                          <label>Contraseña</label>
                          <input type="password" placeholder="La contraseña debe tener al menos 6 caracteres" />
                        </div>
                        <div className="form-group">
                          <label>Repetir Contraseña</label>
                          <input type="password" placeholder="La contraseña debe tener al menos 6 caracteres" />
                        </div>
                    </>
                    )}
                    <div className="form-group">
                    <label>Rol</label>
                    <div className="role-options">
                        <button 
                            className={`role-btn ${selectedRole === 'Admin' ? 'selected' : ''}`} 
                            onClick={() => handleRoleSelect('Admin')}
                             >Admin</button>
                        <button 
                            className={`role-btn ${selectedRole === 'Client' ? 'selected' : ''}`} 
                            onClick={() => handleRoleSelect('Client')}
                            >Cliente</button>

                    </div>
                </div>
                    <div className="form-actions">
                        <button className="btn cancel-btn" onClick={handleRemoveAdmin}>Cancelar</button>
                        <button className="btn save-btn">Agregar</button>
                    </div>
                </div>
            </div>
        )}
        <Footer/>
      </div>
    );

}

