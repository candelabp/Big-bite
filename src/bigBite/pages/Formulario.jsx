import '../css/formulario.css';
import { useForm } from "react-hook-form";


export const Formulario = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    // Llamada al backend usando fetch
    fetch('http://localhost:8080/api/registro/crear', {
      method: 'POST', // Enviar la solicitud como POST
      headers: {
        'Content-Type': 'application/json', // Especificar el formato de los datos
      },
      body: JSON.stringify(data), // Convertir los datos a JSON
    })
    .then((response) => response.json()) // Obtener la respuesta del servidor
    .then((responseData) => {
      console.log('Respuesta del servidor:', responseData);
      alert('Registro exitoso');
    })
    .catch((error) => {
      console.error('Hubo un error:', error);
      alert('Error al enviar los datos');
    });
  };

  return (
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

        <button type="submit">Enviar</button>
        <button type="button" onClick={() => reset()}>Resetear</button>
      </form>
    </div>
  );
}

