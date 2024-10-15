import { useState } from 'react';
import '../css/administradores.css'
import userimage from '../assets/benavides-geronimo-image.webp';
import { Footer } from '../components/Footer'; 
import { NavBar } from '../components/NavBarRojo';

export const Administradores = () => {

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isAddingAdmin, setIsAddingAdmin] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Admin');
  
    const admins = [
      { id: 1,image:userimage , name: "Jane Doe", role: "Admin" },
      { id: 2,image:userimage , name: "John Smith", role: "Admin" }
    ];
  
    const handleSelectAdmin = (admin) => {
        setSelectedAdmin(admin);
        setIsAddingAdmin(false)
        // No cambiar isAddingAdmin, el formulario no debe aparecer al seleccionar un admin.
      };
      
    const handleViewAdmin = (admin) => {
        setSelectedAdmin(admin); // Se establece el admin seleccionado
        setIsAddingAdmin(true); // Asegúrate de que el formulario no esté abierto
    };
  
    const handleRoleSelect = (role) => {
        setSelectedRole(role); // Cambia el rol seleccionado
    };

    const handleAddAdmin = () => {
      setSelectedAdmin(null);
      setIsAddingAdmin(true);
    };
  
    const handleRemoveAdmin = () => {
      setSelectedAdmin(null);
      setIsAddingAdmin(false);
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
            <button className="btn add-btn" onClick={handleAddAdmin}>Add Admin</button>
          </div>
        </div>
  
        {/* Parte Media */}
        <div className="middle-section">
          <div className='zona-media-izquierda'> 
            <h1>Current Admins</h1>
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
        {(isAddingAdmin ) && (
            <div className='linea'>
                <hr />
            </div>
        )}
        {(isAddingAdmin ) && (
            
            
            <div className="bottom-section">
                
                <div className='zona-baja-izq'>
                    <h1>Detalles Admin</h1>
                </div>
                <div className='zona-baja-der'>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" placeholder="Enter name" defaultValue={selectedAdmin?.name || ''} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
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
                            >Client</button>

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

