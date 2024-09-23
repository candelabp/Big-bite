import '../css/formulario.css';
import { useForm } from "react-hook-form";
import { useState } from 'react'; // Asegúrate de importar useState
import { NavBarBlanco } from '../components/NavBarBlanco';
import { Footer } from '../components/Footer';

export const Formulario = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch("password");

  

  const onSubmit = (data) => {
    // Incluir la imagen base64 en los datos
    const payload = {
      ...data
    };

    // Llamada al backend usando fetch
    fetch('http://localhost:8080/usuarios/registrar', {
      method: 'POST', // Enviar la solicitud como POST
      headers: {
        'Content-Type': 'application/json', // Especificar el formato de los datos
      },
      body: JSON.stringify(payload), // Convertir los datos a JSON
    })
    .then((response) => {
      if (!response.ok) {
        // Si la respuesta no es "OK", lanzamos un error con el mensaje devuelto
        return response.text().then((text) => { throw new Error(text); });
      }
      return response.text(); // Si es exitoso, obtenemos el mensaje
    })
    .then((message) => {
      console.log('Respuesta del servidor:', message);
      alert(message); // Mostrar el mensaje de éxito
    })
    .catch((error) => {
      console.error('Hubo un error:', error);
      alert(error.message); // Mostrar el mensaje de error
    });
  };

  return (
    <div>
      <NavBarBlanco />
      <div className='titulo-form'>
        <h1>Formulario de registro</h1>
      </div>
      <div className='formulario'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre:</label>
            <input {...register("nombre", { required: "El nombre es obligatorio" })} />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </div>

          <div>
            <label>Apellido:</label>
            <input {...register("apellido", { required: "El apellido es obligatorio" })} />
            {errors.apellido && <span>{errors.apellido.message}</span>}
          </div>

          <div>
            <label>Telefono:</label>
            <input {...register("telefono", { required: "El telefono es obligatorio" })} />
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email no válido",
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>Imagen de perfil:</label>
            <input
              type="file"
              accept="image/*"
              {...register("imagen", { required: "La imagen es obligatoria" })}
            
            />
            {errors.imagen && <span>{errors.imagen.message}</span>}
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div>
            <label>Repetir contraseña:</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Debes repetir la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
          </div>

          <div className="formulario-buttons">
            <button type="submit" className='boton-enviar'>Enviar</button>
            <button type="button" className='boton-reset' onClick={() => reset()}>Limpiar</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
