import React, { useState } from "react";
import '../css/navbarAdmin.css';
import { Link, useNavigate } from 'react-router-dom';
import logoNegro from '../assets/logoNegro.png'

const NavbarAdmin = () =>{

  const navigate=useNavigate();
  const handleImageClick=()=>{
    navigate("/")
  }
  
  return(
    <div>
      <header className="header">
      <img className="logo-admin" src={logoNegro} alt="Logo-admin" onClick={handleImageClick} />       
        <Link className="tituloLinkAdmin" to="/AdminPpal">Inicio</Link>
        <Link className="tituloLinkAdmin" to="/AdminProductos">Productos</Link>
        <Link className="tituloLinkAdmin" to="/Administradores">Administradores</Link>
        <Link className="tituloLinkAdmin" to="/AsientosContables">Asientos contables</Link>
        <Link className="tituloLinkAdmin" to="/GestionPedidos">Pedidos</Link>

      </header>
    </div>
  )
}
export default NavbarAdmin