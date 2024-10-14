import { useState } from "react";
import '../css/navbarBlanco.css';
import { Link } from 'react-router-dom';

export const NavBarBlanco = () => {
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
        <nav className="navbarBlanco">
            {/* Botón para abrir el menú */}
            <button className="menu-icon" id="menu-icon" onClick={abrirMenu}>
                <i className="bi bi-list btnListBlanco"></i>
            </button>

            <div className="logoContenedorBlanco">
                <Link to='/'><img className="logo" src="src\\bigBite\\assets\\logoNegro.png" alt="Logo" /></Link>
            </div>

            <div className="menu-icon-carrito menu-icon">
                <Link to='/carrito'><button className="btn-amarillo"><i className="bi bi-cart-fill"></i><span className="contadorCarrito">0</span></button></Link>
            </div>

            {/* Lista de enlaces de navegación */}
            <ul className={`nav-linkss ${menuAbierto ? 'active' : ''}`} id="nav-linkss">
                <li className="headerNavBar">
                    {/* Botón para cerrar el menú */}
                    <div className="menu-icon" id="menu-icon-cerrar" onClick={cerrarMenu}>
                        <i className="bi bi-x btnXBlanco"></i>
                    </div>

                    <div className="logoContenedorBlanco">
                        <img className="logo" src="src\\bigBite\\assets\\logoNegro.png" alt="Logo" />
                    </div>
                </li>

                <li>
                    <div className="contPerfil">
                        <i className="bi bi-person-circle iconLogeadoNegro"></i>
                        <h3 className="nombrePerfilNegro"><Link to="/login" className="inicioSesionBlanco">Iniciar Sesion</Link></h3>
                    </div>
                </li>

                <li className="contLinks">
                    <i className="bi bi-house-door"></i>
                    <Link className="tituloLinkNegro" to="/">Inicio</Link>
                </li>

                <li className="contLinks">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ri-restaurant-line" viewBox="0 0 24 24" width="28" height="43" fill="currentColor">
                        <path d="M21 2V22H19V14H16V7C16 4.23858 18.2386 2 21 2ZM9 13.9V22H7V13.9C4.71776 13.4367 3 11.419 3 9V3H5V10H7V3H9V10H11V3H13V9C13 11.419 11.2822 13.4367 9 13.9Z"></path>
                    </svg>
                    <Link className="tituloLinkNegro" to="/menu">Menu</Link>
                </li>

                <li className="contLinks">
                    <i className="bi bi-question-circle"></i>
                    <Link className="tituloLinkNegro" to="/contacto">Contacto</Link>
                </li>

                <li className="contLinks">
                    <div className="group">
                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                        <input placeholder="Search" type="search" className="inputNegro" />
                    </div>
                </li>

                <li className="redesNav">
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-facebook"></i>
                </li>

                <img src="src\\bigBite\\assets\\logoNegro.png" alt="Logo" className="imgNavbar" />
            </ul>
        </nav>
    );
};
