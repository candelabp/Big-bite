import { useContext, useState } from "react";
import '../css/navbarBlanco.css';
import { Link } from 'react-router-dom';
import TotalCart from "./CartContent/TotalCart";
import { UserContext } from '../../context/UserContext';

export const NavBarBlanco = () => {
    // Estado para manejar si el menú está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { user } = useContext(UserContext);


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
                <Link to='/carrito'><button className="btn-amarillo"><i className="bi bi-cart-fill"></i><TotalCart></TotalCart></button></Link>
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

                {user ? (
                    <li>
                        <div className="contPerfil">
                        <img className="logoLogeado" src={user.photoURL} alt="Logo" />
                            <h3 className="nombrePerfilNegro">{user.displayName}</h3>
                        </div>
                    </li>
                ) : (
                    <li>
                        <div className="contPerfil">
                            <i className="bi bi-person-circle iconLogeadoNegro"></i>
                            <h3 className="nombrePerfilNegro"><Link to="/login" className="text-dark">Iniciar Sesion</Link></h3>
                        </div>
                    </li>
                )}


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