import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminProductos = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [hamburguesas, setHamburguesas] = useState([]);
  const [selectedHamburguesa, setSelectedHamburguesa] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cargar hamburguesas desde el backend
    fetch('http://localhost:8080/hamburguesas')
      .then(response => response.json())
      .then(data => setHamburguesas(data))
      .catch(error => console.error('Error al cargar las hamburguesas:', error));
  }, []);

  const onSubmit = (data) => {
    // Determina si "disponible" debe ser true o false
    data.disponible = selectedHamburguesa ? data.disponible : (data.stock > 0);

    const formData = new FormData();
    formData.append('hamburguesaDTO', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    // Agregar la imagen actual si no se ha seleccionado una nueva
    if (selectedHamburguesa && !data.imagenHamburguesa.length) {
      formData.append('imagenHamburguesa', selectedHamburguesa.urlImagen);
    } else if (data.imagenHamburguesa && data.imagenHamburguesa.length > 0) {
      formData.append('imagenHamburguesa', data.imagenHamburguesa[0]);
    }

    const url = selectedHamburguesa ?
      `http://localhost:8080/hamburguesas/editar/${selectedHamburguesa.id}` :
      'http://localhost:8080/hamburguesas/agregar';

    const method = selectedHamburguesa ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
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
        setImagePreview(null);
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
    setValue('precio', hamburguesa.precio);
    setValue('precioCombo', hamburguesa.precioCombo);
    setValue('stock', hamburguesa.stock);
    setValue('tiempoPreparacion', hamburguesa.tiempoPreparacion);
    setValue('disponible', hamburguesa.disponible);
    setImagePreview(hamburguesa.urlImagen || null);
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Verifica si todos los campos requeridos están llenos
  const isFormComplete = () => {
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'stock', 'tiempoPreparacion'];
    return requiredFields.every(field => watch(field) !== undefined && watch(field) !== null && watch(field) !== '');
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Hamburguesas</h1>
          <p>Agrega o edita productos en el menú</p>
          <nav className="nav-categorias">
            <ul>
              <li><a href="/AdminProductos">Hamburguesas</a></li>
              <li><a href="/AdminPapas">Papas Fritas</a></li>
              <li><a href="/AdminBebidas">Bebidas</a></li>
              <li><a href="/AdminBiteBox">Bite Box</a></li>
            </ul>
          </nav>
        </header>
        <section className="contenedor-formulario">
          <h2>{selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Nombre:</label>
              <input {...register("nombre", { required: "El nombre es obligatorio" })} />
              {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
            </div>
            <div>
              <label>Descripción:</label>
              <input {...register("descripcion", { required: "La descripción es obligatoria" })} />
              {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
            </div>
            <div>
              <label>Precio Costo:</label>
              <input type="number" step="0.01" {...register("precio", { required: "El precio costo es obligatorio" })} />
              {errors.precio && <span className="error-message">{errors.precio.message}</span>}
            </div>
            <div>
              <label>Precio Venta:</label>
              <input type="number" step="0.01" {...register("precioCombo", { required: "El precio venta es obligatorio" })} />
              {errors.precioCombo && <span className="error-message">{errors.precioCombo.message}</span>}
            </div>
            <div>
              <label>Stock Actual:</label>
              <input type="number" {...register("stock", { required: "El stock es obligatorio" })} />
              {errors.stock && <span className="error-message">{errors.stock.message}</span>}
            </div>
            <div>
              <label>Tiempo de Preparación (minutos):</label>
              <input type="number" {...register("tiempoPreparacion", { required: "El tiempo de preparación es obligatorio" })} />
              {errors.tiempoPreparacion && <span className="error-message">{errors.tiempoPreparacion.message}</span>}
            </div>

            {/* Casilla disponible que solo aparece al editar */}
            {selectedHamburguesa && (
              <div>
                <label>Disponible:</label>
                <input type="checkbox" {...register("disponible")} />
              </div>
            )}

            <div>
              <label>Imagen:</label>
              <input type="file" accept="image/*" {...register("imagenHamburguesa")} onChange={handleImageChange} />
            </div>
            
            {/* Previsualización de la imagen o mensaje cuando no haya imagen */}
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Previsualización" className="imagen-producto" />
              ) : (
                <p>No hay imagen cargada</p>
              )}
            </div>
            
            <button type="submit" disabled={!isFormComplete()} className={`submit-button ${!isFormComplete() ? 'disabled' : ''}`}>
              {selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}
            </button>
          </form>
          <button onClick={() => setIsModalOpen(true)} className="btn-modal">
            Editar Hamburguesa existente
          </button>
        </section>

        {/* Modal para seleccionar hamburguesas */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Seleccionar Hamburguesa para Editar</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              <div className="modal-body">
                {hamburguesas.map((hamburguesa) => (
                  <div key={hamburguesa.id} className="product-item">
                    {hamburguesa.urlImagen ? (
                      <img src={hamburguesa.urlImagen} alt={hamburguesa.nombre} className="product-modal-image" />
                    ) : (
                      <img src="/placeholder.jpg" alt="Sin imagen" className="product-modal-image" />
                    )}
                    <div className="product-details">
                      <p><strong>{hamburguesa.nombre}</strong></p>
                      <p>Precio: ${hamburguesa.precioCombo}</p>
                      <button onClick={() => editarHamburguesa(hamburguesa)}>Editar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
