import  { useState } from 'react';
import '../css/contacto.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';

export const Contacto = () => { 
    return (
        <>
            <NavBarBlanco></NavBarBlanco>
            <div className="contenedorContactanos">
                <h2 className="tituloContactanos">Contactanos</h2>
                
                <form action="" className='formularioContactanos'>
                    <label>Correo:
                        <input type='email' placeholder='Correo...' className="inputsContactanos"></input>
                    </label>
                    <label>Nombre:
                        <input type='text' placeholder='Nombre...' className="inputsContactanos"></input>
                    </label>
                    <label>Descripcion
                    <textarea placeholder='Ingrese su mensaje' className='textareaContacto' name="" id=""></textarea>
                    </label>
                    <button className='btnSubmitContacto' type="submit">Enviar</button>
                </form>

            </div>

        

            <Footer></Footer>
        </>
    );
};