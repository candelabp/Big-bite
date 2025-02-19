import { useContext, useState } from "react";
import '../css/navbarBlanco.css';
import { Link } from 'react-router-dom';
import TotalCart from "./CartContent/TotalCart";
import { UserContext } from '../../context/UserContext';
import logoNegro from '../assets/logoNegro.png'
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";

export const NavBarBlanco = () => {
    // Estado para manejar si el menú está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { user, role, resetcart} = useContext(UserContext);


    // Función para abrir/cerrar el menú
    const abrirMenu = () => {
        setMenuAbierto(!menuAbierto); // Alterna entre abierto y cerrado
    };

    // Función para cerrar el menú (por ejemplo, al hacer clic en el botón de cerrar)
    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    const handleSignOut = () => {
        Swal.fire({
            text: "¿Deseas cerrar sesión?",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const auth = getAuth();
                signOut(auth).then(() => {
                    // Sign-out successful.
                    localStorage.removeItem('user');
                    window.location.reload();
                    window.location.href = '/';
                }).catch((error) => {
                    // An error happened.
                    console.error("An error happened during sign-out:", error);
                });
            }
        });
    }

    return (
        <nav className="navbarBlanco">
            {/* Botón para abrir el menú */}
            <button className="menu-icon" id="menu-icon" onClick={abrirMenu}>
                <i className="bi bi-list btnListBlanco"></i>
            </button>

            <div className="logoContenedorBlanco">
                <Link to='/'><img className="logo" src={logoNegro} alt="Logo" /></Link>
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
                        <img className="logo" src={logoNegro} alt="Logo" />
                    </div>
                </li>

                {user ? (
                    <li>
                        <div className="contPerfil">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User Profile" className="logoLogeado" />
                            ) : (
                                <i className="bi bi-person-circle iconLogeadoNegro"></i>
                            )}
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

                {(user !== null) && (
                    <li className="contLinks">
                        <i className="bi bi-list-check"></i>
                        <Link className="tituloLinkNegro" to="/mispedidos">Mis Pedidos</Link>
                    </li>


                )}

                <li className="contLinks">
                    <i className="bi bi-question-circle"></i>
                    <Link className="tituloLinkNegro" to="/contacto">Contacto</Link>
                </li>

                {(role == "admin" || role == "empleado") && (
                    <li className="contLinks">
                        <i className="bi bi-gear-fill"></i>
                        <Link className="tituloLinkNegro" to="/AdminPpal">Administración</Link>
                    </li>
                )}

                {user && (
                    <li className="contLinks" onClick={handleSignOut}>
                        <div className="salirBlanco">
                            <i className="bi bi-box-arrow-left buttonSalirRojo"></i>
                        </div>
                        <Link className="tituloLinkNegro">Cerrar Sesión</Link>
                    </li>
                )}


                <li className="redesNav">
                    <Link to='https://x.com/?lang=es' target='_blank'><i className="bi bi-twitter-x tituloLinkNegro"></i></Link>
                    <Link to='https://www.instagram.com/?hl=es' target='_blank'><i className="bi bi-instagram tituloLinkNegro"></i></Link>
                    <Link to='https://facebook.com/?locale=es_LA' target='_blank'><i className="bi bi-facebook tituloLinkNegro"></i></Link>
                </li>

                <img src={logoNegro} alt="Logo" className="imgNavbar" />
            </ul>
        </nav>
    );
};