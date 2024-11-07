import React, { useContext, useState } from "react";
import '../css/navbarAdmin.css';
import { Link } from 'react-router-dom';
import logoNegro from '../assets/logoNegro.png'
import { UserContext } from "../../context/UserContext";
const NavbarAdmin = () =>{
  const { user, role } = useContext(UserContext);
  return(
    <div>
      <header className="header">
      <img className="logo-admin" src={logoNegro} alt="Logo-admin" />       
        <Link className="tituloLinkAdmin" to="/AdminPpal">Inicio</Link>
        <Link className="tituloLinkAdmin" to="/AdminProductos">Productos</Link>
        {role !== 'empleado' && (
          <Link className="tituloLinkAdmin" to="/Administradores">Administradores</Link>
        )}
        <Link className="tituloLinkAdmin" to="/AsientosContables">Asientos contables</Link>
        <Link className="tituloLinkAdmin" to="/GestionPedidos">Pedidos</Link>

      </header>
    </div>
  )
}
export default NavbarAdmin