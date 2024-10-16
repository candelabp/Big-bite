import React, { useState } from "react";
import '../css/navbarAdmin.css';
import { Link } from 'react-router-dom';

const NavbarAdmin = () =>{
  return(
    <div>
      <header className="header">
      <img className="logo-admin" src="src\bigBite\assets\logoNegro.png" alt="Logo-admin" />        <nav className="navbar"></nav>
        <Link className="tituloLinkAdmin" to="/AdminPpal">Inicio</Link>
        <Link className="tituloLinkAdmin" to="/AdminProductos">Productos</Link>
        <Link className="tituloLinkAdmin" to="/">Administrador</Link>
        <Link className="tituloLinkAdmin" to="/AsientosContables">Asientos contables</Link>
        <Link className="tituloLinkAdmin" to="/GestionPedidos">Pedidos</Link>

      </header>
    </div>
  )
}
export default NavbarAdmin