import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css'; // Usa el mismo CSS que AdminProductos
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminBebidas = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [bebidas, setBebidas] = useState([]);
  const [selectedBebida, setSelectedBebida] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    // Cargar bebidas desde el backend
    fetch('http://localhost:8080/bebidas')
      .then(response => response.json())
      .then(data => setBebidas(data))
      .catch(error => console.error('Error al cargar las bebidas:', error));
  }, []);

  const onSubmit = (data) => {
    // Asignar tiempo de preparación 0 automáticamente
    data.tiempoPreparacion = 0;

    // Determinar si "disponible" debe ser true o false
    data.disponible = selectedBebida ? data.disponible : (data.stock > 0);

    const formData = new FormData();
    formData.append('bebidaDTO', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));

    // Agregar imagen si hay una nueva
    if (selectedBebida && !data.imagenBebida.length) {
      formData.append('imagenBebida', selectedBebida.urlImagen);
    } else if (data.imagenBebida && data.imagenBebida.length > 0) {
      formData.append('imagenBebida', data.imagenBebida[0]);
    }

    const url = selectedBebida ? 
      `http://localhost:8080/bebidas/editar/${selectedBebida.id}` :
      'http://localhost:8080/bebidas/agregar';

    const method = selectedBebida ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData
    })
      .then(response => response.ok ? response.text() : response.text().then(text => { throw new Error(text); }))
      .then(message => {
        alert(selectedBebida ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedBebida(null);
        setImagePreview(null);
        return fetch('http://localhost:8080/bebidas')
          .then(response => response.json())
          .then(data => setBebidas(data));
      })
      .catch(error => alert('Error al enviar los datos'));
  };

  const editarBebida = (bebida) => {
    setSelectedBebida(bebida);
    setValue('nombre', bebida.nombre);
    setValue('descripcion', bebida.descripcion);
    setValue('precio', bebida.precio);
    setValue('precioCombo', bebida.precioCombo);
    setValue('stock', bebida.stock);
    setValue('marca', bebida.marca);
    setValue('disponible', bebida.disponible);
    setImagePreview(bebida.urlImagen || null);
    setIsModalOpen(false); // Cierra el modal al editar
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

  const isFormComplete = () => {
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'stock', 'marca'];
    return requiredFields.every(field => watch(field));
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Bebidas</h1>
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
          <h2>{selectedBebida ? 'Editar Bebida' : 'Registrar Bebida'}</h2>
          <form className='form-producto' onSubmit={handleSubmit(onSubmit)}>
            
            <div>
              <label className='label-producto'>Nombre:</label>
              <input className='input-producto' {...register("nombre", { required: "El nombre es obligatorio" })} />
              {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Descripción:</label>
              <input className='input-producto' {...register("descripcion", { required: "La descripción es obligatoria" })} />
              {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Precio Costo:</label>
              <input className='input-producto' type="number" step="0.01" {...register("precio", { required: "El precio costo es obligatorio" })} />
              {errors.precio && <span className="error-message">{errors.precio.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Precio Venta:</label>
              <input className='input-producto' type="number" step="0.01" {...register("precioCombo", { required: "El precio venta es obligatorio" })} />
              {errors.precioCombo && <span className="error-message">{errors.precioCombo.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Stock:</label>
              <input className='input-producto' type="number" {...register("stock", { required: "El stock es obligatorio" })} />
              {errors.stock && <span className="error-message">{errors.stock.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Marca:</label>
              <select className='input-producto' {...register("marca", { required: "La marca es obligatoria" })}>
                <option value="">Seleccione una marca</option>
                <option value="Coca-Cola">Coca-Cola</option>
                <option value="Sprite">Sprite</option>
                <option value="Fanta">Fanta</option>
                <option value="Agua">Agua</option>
              </select>
              {errors.marca && <span className="error-message">{errors.marca.message}</span>}
            </div>

             {/* Disponible que sale solo al editar */}
             {selectedBebida && (
              <div>
                <label className='label-producto'>Disponible:</label>
                <input type="checkbox" {...register("disponible")} />
              </div>
            )}
            
            <div>
              <label className='label-producto'>Imagen:</label>
              <input type="file" accept="image/*" {...register("imagenBebida")} onChange={handleImageChange} />
          </div>

            {/* Previsualización de la imagen */}
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Previsualización" className="imagen-producto" />
              ) : (
                <p>No hay imagen cargada</p>
              )}
            </div>

            <button type="submit" disabled={!isFormComplete()} className={`submit-button ${!isFormComplete() ? 'disabled' : ''}`}>
              {selectedBebida ? 'Editar Bebida' : 'Registrar Bebida'}
            </button>
          </form>
          <button onClick={() => setIsModalOpen(true)} className="btn-modal">
            Editar Bebida existente
          </button>
        </section>

        {/* Modal para seleccionar bebidas */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Seleccionar Bebida para Editar</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              <div className="modal-body">
                {bebidas.map((bebida) => (
                  <div key={bebida.id} className="product-item">
                    {bebida.urlImagen ? (
                      <img src={bebida.urlImagen} alt={bebida.nombre} className="product-modal-image" />
                    ) : (
                      <img src="/placeholder.jpg" alt="Sin imagen" className="product-modal-image" />
                    )}
                    <div className="product-details">
                      <p><strong>{bebida.nombre}</strong></p>
                      <p>Precio: ${bebida.precioCombo}</p>
                      <button onClick={() => editarBebida(bebida)}>Editar</button>
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
