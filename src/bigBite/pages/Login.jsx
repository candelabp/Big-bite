import '../css/login.css';
//import { useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Login = () => {
    
    const irAPagina = () => {
        // Aquí iría la lógica para redirigir a la página de registro
        window.location.href = '/register'; // Cambia la URL a la página de registro
    };

    return (
        <>
            <NavBarBlanco />
            <div>
                <div className="contenedor-mensaje">
                    <p className="mensaje">
                        <b>Ingresa tu correo electrónico si ya tienes cuenta. <br /> Si no, registrate acá.</b>
                    </p>
                    <div className="btns">
                        <button className="login-btn">Ingresar</button>
                        <button onClick={irAPagina} className="register-btn">Registrarme</button>
                    </div>
                </div>

            </div> 
            <Footer />
        </>
    );
};
