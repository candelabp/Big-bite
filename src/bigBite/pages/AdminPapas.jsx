import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';  // Usa el mismo CSS que AdminProductos
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminPapas = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [papasFritas, setPapasFritas] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedPapasFritas, setSelectedPapasFritas] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false);
  const [selectedInsumos, setSelectedInsumos] = useState([]);

  useEffect(() => {
    // Cargar papas fritas desde el backend
    fetch('http://localhost:8080/papas-fritas')
      .then(response => response.json())
      .then(data => setPapasFritas(data))
      .catch(error => console.error('Error al cargar las papas fritas:', error));
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

  const handleEditPapasFritas = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true); 
  };

  const onSubmit = (data) => {
    data.disponible = data.disponible;
  
    const detalleInsumos = selectedInsumos
      .filter(insumo => insumo.cantidad > 0)
      .map(insumo => ({
        insumoId: insumo.insumoId,  // Asegúrate de que insumoId esté presente y no sea null
        cantidad: parseInt(insumo.cantidad, 10),
      }));
  
    data.detalleInsumos = detalleInsumos;
  
    const formData = new FormData();
    formData.append('papasFritasDTO', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));
  
    // Agregar imagen si hay una nueva
    if (data.imagenPapasFritas && data.imagenPapasFritas.length > 0) {
      formData.append('imagenPapasFritas', data.imagenPapasFritas[0]);
    } else if (selectedPapasFritas && selectedPapasFritas.urlImagen) {
      formData.append('imagenPapasFritas', selectedPapasFritas.urlImagen);
    }
  
    const url = selectedPapasFritas ?
      `http://localhost:8080/papas-fritas/editar/${selectedPapasFritas.id}` :
      'http://localhost:8080/papas-fritas/agregar';
  
    const method = selectedPapasFritas ? 'PUT' : 'POST';
  
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
        alert(selectedPapasFritas ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedPapasFritas(null);
        setImagePreview(null);
        setSelectedInsumos([]); // Limpiar el estado de selectedInsumos
        return fetch('http://localhost:8080/papas-fritas')
          .then(response => response.json())
          .then(data => setPapasFritas(data));
      })
      .catch(error => {
        console.error('Hubo un error:', error);
        alert('Error al enviar los datos');
      });
  };

  const editarPapasFritas = (papasFritas) => {
    setSelectedPapasFritas(papasFritas);
    setValue('nombre', papasFritas.nombre);
    setValue('descripcion', papasFritas.descripcion);
    setValue('precio', papasFritas.precio);
    setValue('precioCombo', papasFritas.precioCombo);
    setValue('tamanio', papasFritas.tamanio); // Mantén el tamaño
    setValue('tiempoPreparacion', papasFritas.tiempoPreparacion); // Asegúrate de asignar el tiempo de preparación
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
    const requiredFields = ['nombre', 'descripcion', 'precio', 'precioCombo', 'tamanio', 'tiempoPreparacion'];
    return requiredFields.every(field => watch(field) !== undefined && watch(field) !== null && watch(field) !== '') &&
        selectedInsumos.some(insumo => insumo.cantidad > 0); // Asegúrate de que haya insumos seleccionados
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Papas Fritas</h1>
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
              <label className='label-producto'>Tiempo de Preparación (minutos):</label>
              <input className='input-producto' type="number" {...register("tiempoPreparacion", { required: "El tiempo de preparación es obligatorio" })} />
              {errors.tiempoPreparacion && <span className="error-message">{errors.tiempoPreparacion.message}</span>}
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

            <div className="container-cbx-productos">
              <span className="label-producto">Disponible:</span>
              <input type="checkbox" id="disponible" {...register("disponible")} />
              <label htmlFor="disponible" className="checkmark-cbx-productos"></label>              
            </div>

            <div>
              <label className='label-producto'>Imagen:</label>
              <input className='input-producto' type="file" accept="image/*" {...register("imagenPapasFritas")} onChange={handleImageChange} />
            </div>

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
                {selectedPapasFritas ? 'Editar Papas Fritas' : 'Registrar Papas Fritas'}
              </button>
              
              <button type="button" onClick={handleEditPapasFritas} className="btnRegistrarHamburguesa">
                Editar Papas Fritas existentes
              </button>
            </div>          
          </form>
        </section>

        {isModalOpen && (
          <div className="products-modal">
            <div className="products-modal-content">
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

        {/* Modal para seleccionar Insumos */}
        {isInsumosModalOpen && (
          <div className="products-modal">
            <div className="products-modal-content">
              <h2>Selecciona los Insumos</h2>
              <button className="btn-close" onClick={() => setIsInsumosModalOpen(false)}></button>
              <div className="modal-body">
                {insumos.map(insumo => {
                  const selectedInsumo = selectedInsumos.find(item => item.insumoId === insumo.id);
                  const cantidad = selectedInsumo ? selectedInsumo.cantidad : 0;

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
                          value={cantidad}
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