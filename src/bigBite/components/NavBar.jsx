import { useState } from "react";
import '../css/navbarRojo.css';

export const NavBar = () => {
    // Estado para manejar si el menú está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función para abrir/cerrar el menú
    const abrirMenu = () => {
        setMenuAbierto(!menuAbierto); // Alterna entre abierto y cerrado
    };

    // Función para cerrar el menú (por ejemplo, al hacer clic en el botón de cerrar)
    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <nav className="navbarRojo">
            {/* Botón para abrir el menú */}
            <button className="menu-icon" id="menu-icon" onClick={abrirMenu}>
                <i className="bi bi-list btnListRojo"></i>
            </button>

            <div className="logoContenedorRojo">
                <img className="logo" src="src\\bigBite\\assets\\logo blanco.png" alt="Logo" />
            </div>

            <div className="menu-icon-carrito menu-icon">
                <button className="btn-amarillo"><i class="bi bi-cart-fill"></i><span className="contadorCarrito">0</span></button>
            </div>

            {/* Lista de enlaces de navegación */}
            <ul className={`nav-links ${menuAbierto ? 'active' : ''}`} id="nav-links">
                <li className="headerNavBar">
                    {/* Botón para cerrar el menú */}
                    <div className="menu-icon" id="menu-icon-cerrar" onClick={cerrarMenu}>
                        <i className="bi bi-x btnXRojo"></i>
                    </div>

                    <div className="logoContenedorRojo">
                        <img className="logo" src="src\bigBite\assets\logo blanco.png" alt="Logo" />
                    </div>
                </li>

                <li>
                    <div className="contPerfil">
                        <i class="bi bi-person-circle iconLogeadoRojo"></i>
                        <h3 className="nombrePerfilRojo">Iniciar Sesion</h3>
                    </div>
                </li>

                <li className="contLinks">
                    <i className="bi bi-house-door houseRojo"></i>
                    <a href="#" className="tituloLinkRojo">Inicio</a>
                </li>

                <li className="contLinks">
                    <a href="#" className="tituloLinkRojo"><svg xmlns="http://www.w3.org/2000/svg" className="ri-restaurant-line" viewBox="0 0 24 24"width="28" height="43" fill="currentColor"><path d="M21 2V22H19V14H16V7C16 4.23858 18.2386 2 21 2ZM9 13.9V22H7V13.9C4.71776 13.4367 3 11.419 3 9V3H5V10H7V3H9V10H11V3H13V9C13 11.419 11.2822 13.4367 9 13.9Z"></path></svg>  Menu</a>
                </li>

                <li className="contLinks">
                    <i className="bi bi-question-circle iconPreguntaRojo"></i>
                    <a href="#" className="tituloLinkRojo">Contacto</a>
                </li>

                <li className="contLinks">
                    <div class="group">
                        <svg class="icon " aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                        <input placeholder="Search" type="search" className="inputRojo" />
                    </div>
                </li>

                <li className="redesNav">
                    <i className="bi bi-twitter redesNavRojo"></i>
                    <i className="bi bi-instagram redesNavRojo"></i>
                    <i className="bi bi-facebook redesNavRojo"></i>
                </li>
                <img src="src\\bigBite\\assets\\logo blanco.png" alt="Logo" className="imgNavbar" />
            </ul>
        </nav>
    );
};
