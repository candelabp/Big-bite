import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';

export const AdminProductos = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [hamburguesas, setHamburguesas] = useState([]);
  const [selectedHamburguesa, setSelectedHamburguesa] = useState(null);

  useEffect(() => {
    // Cargar hamburguesas desde el backend
    fetch('http://localhost:8080/hamburguesas')
      .then(response => response.json())
      .then(data => setHamburguesas(data))
      .catch(error => console.error('Error al cargar las hamburguesas:', error));
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('hamburguesaDTO', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));

    // Agregar imagen solo si se ha seleccionado
    if (data.imagenHamburguesa && data.imagenHamburguesa.length > 0) {
      formData.append('imagenHamburguesa', data.imagenHamburguesa[0]);
    }

    const url = selectedHamburguesa ? 
      `http://localhost:8080/hamburguesas/editar?nombre=${selectedHamburguesa.nombre}` :
      'http://localhost:8080/hamburguesas/crear';

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
      })
      .then(message => {
        console.log('Respuesta del servidor:', message);
        alert(selectedHamburguesa ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedHamburguesa(null);
        // Recargar la lista de hamburguesas
        return fetch('http://localhost:8080/hamburguesas')
          .then(response => response.json())
          .then(data => setHamburguesas(data));
      })
      .catch(error => {
        console.error('Hubo un error:', error);
        alert('Error al enviar los datos');
      });
  };

  const editarHamburguesa = (hamburguesa) => {
    setSelectedHamburguesa(hamburguesa);
    setValue('nombre', hamburguesa.nombre);
    setValue('descripcion', hamburguesa.descripcion);
    setValue('precioCosto', hamburguesa.precioCosto);
    setValue('precioVenta', hamburguesa.precioVenta);
    setValue('stockActual', hamburguesa.stockActual);
    setValue('tiempoPreparacion', hamburguesa.tiempoPreparacion);
  };

  return (
    <div className="contenedor-admin">
      <header className="admin-header">
        <h1>Administrar Productos</h1>
        <p>Agrega o edita hamburguesas en el menú</p>
      </header>
      <section className="contenedor-formulario">
        <h2>{selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nombre:</label>
            <input {...register("nombre", { required: "El nombre es obligatorio" })} />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </div>
          <div>
            <label>Descripción:</label>
            <input {...register("descripcion", { required: "La descripción es obligatoria" })} />
            {errors.descripcion && <span>{errors.descripcion.message}</span>}
          </div>
          <div>
            <label>Precio Costo:</label>
            <input type="number" step="0.01" {...register("precioCosto", { required: "El precio costo es obligatorio" })} />
            {errors.precioCosto && <span>{errors.precioCosto.message}</span>}
          </div>
          <div>
            <label>Precio Venta:</label>
            <input type="number" step="0.01" {...register("precioVenta", { required: "El precio venta es obligatorio" })} />
            {errors.precioVenta && <span>{errors.precioVenta.message}</span>}
          </div>
          <div>
            <label>Stock Actual:</label>
            <input type="number" {...register("stockActual", { required: "El stock es obligatorio" })} />
            {errors.stockActual && <span>{errors.stockActual.message}</span>}
          </div>
          <div>
            <label>Tiempo de Preparación (min):</label>
            <input type="number" {...register("tiempoPreparacion", { required: "El tiempo de preparación es obligatorio" })} />
            {errors.tiempoPreparacion && <span>{errors.tiempoPreparacion.message}</span>}
          </div>
          <div>
            <label>Imagen (opcional):</label>
            <input type="file" accept="image/*" {...register("imagenHamburguesa")} />
          </div>
          <button type="submit">{selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}</button>
        </form>
      </section>
      <section>
        <h2>Hamburguesas Existentes</h2>
        <div className="editar-hamburguesa">
          {hamburguesas.map((hamburguesa) => (
            <div key={hamburguesa.nombre}>
              <p><strong>Nombre:</strong> {hamburguesa.nombre}</p>
              <p><strong>Descripción:</strong> {hamburguesa.descripcion}</p>
              <p><strong>Precio Venta:</strong> {hamburguesa.precioVenta}</p>
              <button onClick={() => editarHamburguesa(hamburguesa)} className="btn-edit">Editar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
