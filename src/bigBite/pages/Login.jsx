import '../css/login.css';

import { Link } from 'react-router-dom';
//import { useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Login = () => {
    
   
    return (
        <>
            <NavBarBlanco />
            <div>
                <div className="contenedor-mensaje">
                    <p className="mensaje">
                        <b>Ingresa tu correo electrónico si ya tienes cuenta. <br /> Si no, registrate acá.</b>
                    </p>
                    <div className="btns">
                        <button className="login-btn"><Link to="/ingresar">Ingresar</Link></button>
                        <button  className="register-btn"><Link to="/formulario">Registrarme</Link></button>
                    </div>
                </div>

            </div> 
            <Footer />
        </>
    );
};
