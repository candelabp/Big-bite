import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminBiteBox = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [biteBoxes, setBiteBoxes] = useState([]);
  const [hamburguesas, setHamburguesas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [selectedBiteBox, setSelectedBiteBox] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cargar BiteBoxes desde el backend
    fetch('http://localhost:8080/bite-box')
      .then(response => response.json())
      .then(data => setBiteBoxes(data))
      .catch(error => console.error('Error al cargar las BiteBoxes:', error));
    
    // Cargar hamburguesas desde el backend para el desplegable
    fetch('http://localhost:8080/hamburguesas')
      .then(response => response.json())
      .then(data => setHamburguesas(data))
      .catch(error => console.error('Error al cargar las hamburguesas:', error));

    // Cargar bebidas desde el backend para el desplegable
    fetch('http://localhost:8080/bebidas')
      .then(response => response.json())
      .then(data => setBebidas(data))
      .catch(error => console.error('Error al cargar las bebidas:', error));
  }, []);

  const handleEditBiteBoxes = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true); 
  };

  const onSubmit = (data) => {
    // Determina si "disponible" debe ser true o false
    data.disponible = selectedBiteBox ? data.disponible : (data.stock > 0);

    const formData = new FormData();
    formData.append('biteBoxDTO', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
    // Agregar la imagen
    if (data.imagen && data.imagen.length > 0) {
      formData.append('imagen', data.imagen[0]);
    }

    const url = selectedBiteBox ?
      `http://localhost:8080/bite-box/editar/${selectedBiteBox.id}` :
      'http://localhost:8080/bite-box/agregar';

    const method = selectedBiteBox ? 'PUT' : 'POST';

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
        alert(selectedBiteBox ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedBiteBox(null);
        setImagePreview(null);
        return fetch('http://localhost:8080/bite-box')
          .then(response => response.json())
          .then(data => setBiteBoxes(data));
      })
      .catch(error => {
        console.error('Hubo un error:', error);
        alert('Error al enviar los datos');
      });
  };

  const editarBiteBox = (biteBox) => {
    setSelectedBiteBox(biteBox);
    setValue('nombre', biteBox.nombre);
    setValue('descripcion', biteBox.descripcion);
    setValue('precio', biteBox.precio);
    setValue('precioCombo', biteBox.precioCombo);
    setValue('stock', biteBox.stock);
    setValue('disponible', biteBox.disponible);
    setValue('contieneJuguete', biteBox.contieneJuguete);
    setValue('hamburguesa', biteBox.hamburguesa.id);
    setValue('bebida', biteBox.bebida.id);
    setImagePreview(biteBox.urlImagen || null);
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
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'stock'];
    return requiredFields.every(field => watch(field) !== undefined && watch(field) !== null && watch(field) !== '');
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Bite Box</h1>
          <p>Agrega o edita productos del menú</p>
          <nav className="nav-categorias">
            <ul>
              <li><a href="/AdminProductos">Hamburguesas</a></li>
              <li><a href="/AdminPapas">Papas Fritas</a></li>
              <li><a href="/AdminBebidas">Bebidas</a></li>
              <li><a href="/AdminBiteBox">Bite Box</a></li>
              <li><a href="/AdminInsumos">Insumos</a></li>
            </ul>
          </nav>
        </header>
        <section className="contenedor-formulario">
          <h2>{selectedBiteBox ? 'Editar BiteBox' : 'Registrar Bite Box'}</h2>
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
              <input className='input-producto' type="number" step="0.01" {...register("precio", { required: "El precio es obligatorio" })} />
              {errors.precio && <span className="error-message">{errors.precio.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Precio Venta:</label>
              <input className='input-producto' type="number" step="0.01" {...register("precioCombo", { required: "El precio combo es obligatorio" })} />
              {errors.precioCombo && <span className="error-message">{errors.precioCombo.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Stock:</label>
              <input className='input-producto' type="number" {...register("stock", { required: "El stock es obligatorio" })} />
              {errors.stock && <span className="error-message">{errors.stock.message}</span>}
            </div>

            <div>
              <label className='label-producto'>Hamburguesa:</label>
              <select className='input-producto' {...register("hamburguesa", { required: "Selecciona una hamburguesa" })}>
                <option value="">Seleccionar</option>
                {hamburguesas.map(hamburguesa => (
                  <option key={hamburguesa.id} value={hamburguesa.id}>{hamburguesa.nombre}</option>
                ))}
              </select>
              {errors.hamburguesa && <span className="error-message">{errors.hamburguesa.message}</span>}
            </div>

            <div>
              <label className='label-producto'>Bebida:</label>
              <select className='input-producto' {...register("bebida", { required: "Selecciona una bebida" })}>
                <option value="">Seleccionar</option>
                {bebidas.map(bebida => (
                  <option key={bebida.id} value={bebida.id}>{bebida.nombre}</option>
                ))}
              </select>
              {errors.bebida && <span className="error-message">{errors.bebida.message}</span>}
            </div>
            
            <div className="container-cbx-productos">
              <span className="label-producto">¿Contiene juguete?</span>
              <input type="checkbox" id="contieneJuguete" {...register("contieneJuguete")} />
              <label htmlFor="contieneJuguete" className="checkmark-cbx-productos"></label>
            </div>

            <div className="container-cbx-productos">
              <span className="label-producto">Disponible:</span>
              <input type="checkbox" id="disponible" {...register("disponible")} />
              <label htmlFor="disponible" className="checkmark-cbx-productos"></label>              
            </div>
            <div>
              <label className='label-producto'>Imagen:</label>
              <input type="file" accept="image/*" {...register("imagen")} onChange={handleImageChange} />
            </div>
            
            {/* Previsualización de la imagen o mensaje cuando no haya imagen */}
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Previsualización" className="imagen-producto" />
              ) : (
                <p>No hay imagen cargada</p>
              )}
            </div>

            <div className='content-buttons-adminProducts' style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
              <button type="submit" disabled={!isFormComplete()} className={`submit-button btnRegistrarHamburguesa ${!isFormComplete() ? 'disabled' : ''}`}>
                {selectedBiteBox ? 'Editar BiteBox' : 'Registrar Bite Box'}
              </button>
              <button type="button" onClick={handleEditBiteBoxes} className="btnRegistrarHamburguesa">
                Editar BiteBox existente
              </button>
            </div>
          </form>
        </section>

        {/* Modal para seleccionar BiteBoxes */}
        {isModalOpen && (
          <div className="products-modal">
            <div className="products-modal-content">
              <h2>Selecciona una BiteBox</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              <div className="modal-body">
                {biteBoxes.map(biteBox => (
                  <div key={biteBox.id} className="product-item">
                    {biteBox.urlImagen ? (
                      <img src={biteBox.urlImagen} alt={biteBox.nombre} className="product-modal-image" />
                    ) : (
                      <img src="/placeholder.jpg" alt="Sin imagen" className="product-modal-image" />
                    )}
                    <div className="product-details">
                      <p><strong>{biteBox.nombre}</strong></p>
                      <p>Precio: ${biteBox.precioCombo}</p>
                      <button className="btnRegistrarHamburguesa" onClick={() => editarBiteBox(biteBox)}>Editar</button>
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