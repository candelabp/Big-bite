import  { useState } from 'react';
import '../css/contacto.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Contacto = () => { 
    return (
        <>
            <NavBarBlanco></NavBarBlanco>
                <div className='contenedorContactanos'>
                    <br />
                    <h3 className='resumencompra'>Contactanos</h3>
                    <div className='contenedorLineaAmarilla'>
                        <hr className='linea'/>
                    </div>
                </div>
            <Footer></Footer>
        </>
    );
};