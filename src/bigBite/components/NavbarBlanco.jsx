import { useState } from 'react';
import '../css/navbarBlanco.css';

export const NavbarBlanco = () => {

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
        <>

            <nav className="navbarBlanco">

                <button className="menu-icon" id="menu-icon" onClick={abrirMenu}><i className="ri-menu-line"></i></button>

                <div className="logoNB">
                    <img className="logoNB" src="src\bigBite\assets\logoNegro.png" alt="" />
                </div>

                <div className="menu-icon">
                    <button className="btn-amarillo">¡Pedí Ya!</button>
                </div>

                <ul className={`nav-linksNB ${menuAbierto ? 'active' : ''}`} id="nav-linksNB">
                    <li className="headerNavBarBlanco">
                        <div className="menu-icon" id="menu-icon-cerrar" onClick={cerrarMenu}>
                            <i className="ri-close-line"></i>
                        </div>

                        <div className="logoNB">
                            <img className="logoNB" src="src\bigBite\assets\logoNegro.png" alt="" />
                        </div>

                    </li>

                    <li>
                        <div className="contPerfil">
                            <img src="src\bigBite\assets\benavides-geronimo-image.webp" alt="" className="fotoPerfil" />
                            <h3 className="nombrePerfilNB">Geronimo Benavides</h3>
                        </div>
                    </li>

                    <li className="contLinks">
                        <i className="ri-home-line"></i>
                        <a href="#">Inicio</a>
                    </li>

                    <li className="contLinks">
                        <i className="ri-restaurant-line"></i>
                        <a href="./pages/menu.html">Menu</a>
                    </li>


                    <li className="contLinks">
                        <i className="bi bi-question-circle"></i>
                        <a href="#">Contacto</a>
                    </li>

                    <li className="redesNav">
                        <i className="ri-instagram-line"></i>
                        <i className="ri-twitter-x-line"></i>
                        <i className="ri-facebook-circle-fill"></i>
                    </li>
                    <img src="src\bigBite\assets\logoNegro.png" alt="" className="imgNavbarBlanco" />
                </ul>
            </nav>

        </>
    )
}
