import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';  // Usa el mismo CSS que AdminProductos
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminPapas = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [papasFritas, setPapasFritas] = useState([]);
  const [selectedPapasFritas, setSelectedPapasFritas] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    // Cargar papas fritas desde el backend
    fetch('http://localhost:8080/papas-fritas')
      .then(response => response.json())
      .then(data => setPapasFritas(data))
      .catch(error => console.error('Error al cargar las papas fritas:', error));
  }, []);

  const onSubmit = (data) => {
    // Asignar tiempo de preparación 0 automáticamente
    data.tiempoPreparacion = 0;

    // Determinar si "disponible" debe ser true o false
    data.disponible = selectedPapasFritas ? data.disponible : (data.stock > 0);

    const formData = new FormData();
    formData.append('papasFritasDTO', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));

    // Agregar imagen si hay una nueva
    if (selectedPapasFritas && !data.imagenPapasFritas.length) {
      formData.append('imagenPapasFritas', selectedPapasFritas.urlImagen);
    } else if (data.imagenPapasFritas && data.imagenPapasFritas.length > 0) {
      formData.append('imagenPapasFritas', data.imagenPapasFritas[0]);
    }

    const url = selectedPapasFritas ? 
      `http://localhost:8080/papas-fritas/editar/${selectedPapasFritas.id}` :
      'http://localhost:8080/papas-fritas/agregar';

    const method = selectedPapasFritas ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      body: formData
    })
      .then(response => response.ok ? response.text() : response.text().then(text => { throw new Error(text); }))
      .then(message => {
        alert(selectedPapasFritas ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedPapasFritas(null);
        setImagePreview(null);
        return fetch('http://localhost:8080/papas-fritas')
          .then(response => response.json())
          .then(data => setPapasFritas(data));
      })
      .catch(error => alert('Error al enviar los datos'));
  };

  const editarPapasFritas = (papasFritas) => {
    setSelectedPapasFritas(papasFritas);
    setValue('nombre', papasFritas.nombre);
    setValue('descripcion', papasFritas.descripcion);
    setValue('precio', papasFritas.precio);
    setValue('precioCombo', papasFritas.precioCombo);
    setValue('stock', papasFritas.stock);
    setValue('tamanio', papasFritas.tamanio); // Mantén el tamaño
    setValue('disponible', papasFritas.disponible);
    setImagePreview(papasFritas.urlImagen || null);
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
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'stock', 'tamanio'];
    return requiredFields.every(field => watch(field));
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Papas Fritas</h1>
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
          <h2>{selectedPapasFritas ? 'Editar Papas Fritas' : 'Registrar Papas Fritas'}</h2>
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
              <label className='label-producto'>Tamaño:</label>
              <select className='input-producto' {...register("tamanio", { required: "El tamaño es obligatorio" })}>
                <option value="">Seleccionar tamaño</option>
                <option value="MEDIANAS">MEDIANAS</option>
                <option value="GRANDES">GRANDES</option>
              </select>
              {errors.tamanio && <span className="error-message">{errors.tamanio.message}</span>}
            </div>

            {/* Casilla disponible que solo aparece al editar */}
            {selectedPapasFritas && (
              <div>
                <label className='label-producto'>Disponible:</label>
                <input type="checkbox" {...register("disponible")} />
              </div>
            )}

            <div>
              <label className='label-producto'>Imagen:</label>
              <input className='input-producto' type="file" accept="image/*" {...register("imagenPapasFritas")} onChange={handleImageChange} />
            </div>


            {/* Previsualización de la imagen */}
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Previsualización" className="imagen-producto" />
              ) : (
                <p>No hay imagen cargada</p>
              )}
            </div>

            <button type="submit" disabled={!isFormComplete()} className={`submit-button btnRegistrarHamburguesa ${!isFormComplete() ? 'disabled' : ''}`}>
              {selectedPapasFritas ? 'Editar Papas Fritas' : 'Registrar Papas Fritas'}
            </button>
          </form>
          <button onClick={() => setIsModalOpen(true)} className="btn-modal btnRegistrarHamburguesa">
            Editar Papas Fritas existentes
          </button>
        </section>

        {/* Modal para seleccionar papas fritas */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Selecciona unas Papas Fritas</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              <div className="modal-body">
                {papasFritas.map((papasFritas) => (
                  <div key={papasFritas.id} className="product-item">
                    {papasFritas.urlImagen ? (
                      <img src={papasFritas.urlImagen} alt={papasFritas.nombre} className="product-modal-image" />
                    ) : (
                      <img src="/placeholder.jpg" alt="Sin imagen" className="product-modal-image" />
                    )}
                    <div className="product-details">
                      <p><strong>{papasFritas.nombre}</strong></p>
                      <p>Precio: ${papasFritas.precioCombo}</p>
                      <button className="btnRegistrarHamburguesa" onClick={() => editarPapasFritas(papasFritas)}>Editar</button>
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