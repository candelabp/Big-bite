import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';
import NavbarAdmin from '../components/NavbarAdmin';
import Swal from 'sweetalert2';

export const AdminProductos = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [hamburguesas, setHamburguesas] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedHamburguesa, setSelectedHamburguesa] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false);
  const [selectedInsumos, setSelectedInsumos] = useState([]);

  useEffect(() => {
    // Cargar hamburguesas desde el backend
    fetch('http://localhost:8080/hamburguesas')
      .then(response => response.json())
      .then(data => setHamburguesas(data))
      .catch(error => console.error('Error al cargar las hamburguesas:', error));
  }, []);

  const fetchInsumos = () => {
    fetch('http://localhost:8080/insumos')  // GET al endpoint de insumos
      .then(response => response.json())
      .then(data => setInsumos(data))  // Guardar los insumos en el estado
      .catch(error => console.error('Error al cargar los insumos:', error));
  };

  // Manejar selección de insumos
  const handleInsumoSelection = (insumoId, cantidad) => {
    setSelectedInsumos(prevSelected => {
      const insumoExists = prevSelected.find(item => item.insumoId === insumoId);
  
      if (insumoExists) {
        return prevSelected.map(item =>
          item.insumoId === insumoId ? { ...item, cantidad: parseInt(cantidad) } : item
        );
      }
  
      if (parseInt(cantidad) > 0) {
        return [...prevSelected, { insumoId, cantidad: parseInt(cantidad) }];
      }
  
      return prevSelected;
    });
  };

  const confirmInsumoSelection = () => {
    // Aquí puedes manejar cualquier lógica adicional antes de cerrar
    setIsInsumosModalOpen(false);
  };

  const handleOpenInsumosModal = () => {
    setIsInsumosModalOpen(true);  // Abrir el modal
    fetchInsumos();  // Cargar los insumos cuando se abre el modal
  };

  const handleEditHamburguesa = (e) => {
    e.preventDefault(); // Evita el envío del formulario
    setIsModalOpen(true); // Abre el modal para seleccionar hamburguesas existentes
  };

  const onSubmit = (data) => {
    data.disponible = data.disponible;
  
    const detalleInsumos = selectedInsumos
      .filter(insumo => insumo.cantidad > 0)
      .map(insumo => ({
        insumoId: insumo.insumoId,
        cantidad: parseInt(insumo.cantidad, 10),
      }));
  
    data.detalleInsumos = detalleInsumos;
  
    const formData = new FormData();
    formData.append('hamburguesaDTO', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  
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
        selectedHamburguesa ? Swal.fire({text: "Se editó correctamente!", icon: "success"}) : Swal.fire({text: "Se registró correctamente!", icon: "success"});
        reset();
        setSelectedHamburguesa(null);
        setImagePreview(null);
        setSelectedInsumos([]); // Limpiar el estado de selectedInsumos
        return fetch('http://localhost:8080/hamburguesas')
          .then(response => response.json())
          .then(data => setHamburguesas(data));
      })
      .catch(error => {
        console.error('Hubo un error:', error);
        Swal.fire({text: "Error al enviar los datos.", icon: "error"});
      });
  };

  const editarHamburguesa = (hamburguesa) => {
    setSelectedHamburguesa(hamburguesa);
    setValue('nombre', hamburguesa.nombre);
    setValue('descripcion', hamburguesa.descripcion);
    setValue('precio', hamburguesa.precio);
    setValue('precioCombo', hamburguesa.precioCombo);
    setValue('tiempoPreparacion', hamburguesa.tiempoPreparacion);
    setValue('disponible', hamburguesa.disponible);
    setImagePreview(hamburguesa.urlImagen || null);
  
    // Establecer los insumos y sus cantidades
    if (hamburguesa.insumos && hamburguesa.insumos.length > 0) {
      const insumosConCantidad = hamburguesa.insumos.map(detalle => ({
        insumoId: detalle.insumo.id,
        cantidad: detalle.cantidad
      }));
      setSelectedInsumos(insumosConCantidad);  // Aquí estás cargando los insumos correctamente
    } else {
      setSelectedInsumos([]);  // Si no hay insumos, limpiamos la selección
    }
  
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
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'tiempoPreparacion'];
    return requiredFields.every(field => watch(field) !== undefined && watch(field) !== null && watch(field) !== '') &&
        selectedInsumos.some(insumo => insumo.cantidad > 0); // Asegúrate de que haya insumos seleccionados
  };


  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Hamburguesas</h1>
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
          <h2>{selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}</h2>
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
              <input className='input-producto'  type="number" step="0.01" {...register("precio", { required: "El precio costo es obligatorio" })} />
              {errors.precio && <span className="error-message">{errors.precio.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Precio Venta:</label>
              <input className='input-producto' type="number" step="0.01" {...register("precioCombo", { required: "El precio venta es obligatorio" })} />
              {errors.precioCombo && <span className="error-message">{errors.precioCombo.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Tiempo de Preparación (minutos):</label>
              <input className='input-producto' type="number" {...register("tiempoPreparacion", { required: "El tiempo de preparación es obligatorio" })} />
              {errors.tiempoPreparacion && <span className="error-message">{errors.tiempoPreparacion.message}</span>}
            </div>

            <div className="container-cbx-productos">
              <span className="label-producto">Disponible:</span>
              <input type="checkbox" id="disponible" {...register("disponible")} />
              <label htmlFor="disponible" className="checkmark-cbx-productos"></label>              
            </div>


            <div>
              <label className='label-producto'>Imagen:</label>
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
            <div className='content-buttons-adminProducts' style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
               <button type="button" onClick={handleOpenInsumosModal} className="btnModal">
                Seleccionar insumos
                </button>
              
              <button type="submit" disabled={!isFormComplete()} className={`btnRegistrarHamburguesa ${!isFormComplete() ? 'disabled' : ''}`}>
                {selectedHamburguesa ? 'Editar Hamburguesa' : 'Registrar Hamburguesa'}
              </button>
              
              <button type="button" onClick={handleEditHamburguesa} className="btnRegistrarHamburguesa">
                Editar Hamburguesa existente
              </button>
            </div>
          </form>
        </section>

        {/* Modal para seleccionar hamburguesas */}
        {isModalOpen && (
          <div className="products-modal">
            <div className="products-modal-content">
              <h2>Selecciona una Hamburguesa</h2>
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
                      <button className="btnRegistrarHamburguesa" onClick={() => editarHamburguesa(hamburguesa)}>Editar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal para seleccionar Insumos */}
        {isInsumosModalOpen && (
          <div className="products-modal">
            <div className="products-modal-content">
              <h2>Selecciona los Insumos</h2>
              <button className="btn-close" onClick={() => setIsInsumosModalOpen(false)}></button>
              <div className="modal-body">
              {insumos.map(insumo => {
                const selectedInsumo = selectedInsumos.find(item => item.insumoId === insumo.id);
                const cantidad = selectedInsumo ? selectedInsumo.cantidad : 0; // Establece la cantidad si existe, si no, 0

                return (
                  <div key={insumo.id} className="product-item">
                    <div className="product-details">
                      <p><strong>{insumo.nombre}</strong></p>
                      <p>{insumo.unidadMedida}</p>
                      {/* Campo para ingresar la cantidad del insumo */}
                      <input
                        type="number"
                        min="0"
                        placeholder="Cantidad"
                        value={cantidad} // Aquí es donde se muestra la cantidad actual
                        onChange={(e) => handleInsumoSelection(insumo.id, e.target.value)}
                        className="input-producto"
                      />
                    </div>
                  </div>
                );
              })}
                <button onClick={confirmInsumoSelection} className="btnRegistrarHamburguesa">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};