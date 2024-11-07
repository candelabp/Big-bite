import { useState } from 'react';
import '../css/contacto.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const Contacto = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_f56y45j', 'template_9y2q9jh', form.current, {
        publicKey: 'PFv3jO4gIk6MFFpgA',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Correo enviado exitosamente!",
            showConfirmButton: false,
            timer: 1000
          });
          form.current.reset();
          
        },
        (error) => {
            Swal.fire({
              icon: "error",
              text: "Ha ingresado un dato invalido!",
            });
        },
      );
  };

  return (
    <>
      <NavBarBlanco />
      <div className="contenedorContactanos">
        <h2 className="tituloContactanos">Contactanos</h2>

        <form className='formularioContactanos' ref={form} onSubmit={sendEmail}>
          <label>
            Correo:
            <input required type='email' name="user_email" placeholder='Correo...' className="inputsContactanos" />
          </label>
          <label>
            Nombre:
            <input required type='text' name="user_name" placeholder='Nombre...' className="inputsContactanos" />
          </label>
          <label>
            Descripcion
            <textarea required placeholder='Ingrese su mensaje' name="message" className='textareaContacto'></textarea>
          </label>
          <button className='btnSubmitContacto' type="submit" value="Send">Enviar</button>
        </form>
      </div>

      <Footer />
    </>
  );
};
