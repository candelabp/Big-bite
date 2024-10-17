import  { useState } from 'react';
import '../css/contacto.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Contacto = () => { 
    return (
        <>
            <NavBarBlanco></NavBarBlanco>
            <div className="contenedorContactanos">
                <h2 className="tituloContactanos">Contacto</h2>

                <form action="" className='formularioContactanos'>
                    <label>Correo:
                        <input type='email' placeholder='Correo...' className="inputsContactanos"></input>
                    </label>
                    <label>Nombre:
                        <input type='text' placeholder='Nombre...' className="inputsContactanos"></input>
                    </label>
                    <label>Ingrese su Mensaje:
                        <textarea name="" id="" placeholder='Ingrese su mensaje:' className='inputsContactanos'></textarea>
                    </label>
                    <button type="submit">Enviar</button>
                </form>

            </div>

        

            <Footer></Footer>
        </>
    );
};