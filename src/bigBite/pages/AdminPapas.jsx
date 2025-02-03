import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';  // Usa el mismo CSS que AdminProductos
import NavbarAdmin from '../components/NavbarAdmin';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getEnvironments } from '../../helpers/getEnvironments';
import Swal from 'sweetalert2';

export const AdminPapas = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [papasFritas, setPapasFritas] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedPapasFritas, setSelectedPapasFritas] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsumosModalOpen, setIsInsumosModalOpen] = useState(false);
  const [selectedInsumos, setSelectedInsumos] = useState([]);

  const {
    VITE_API_HOST
  } = getEnvironments();

  useEffect(() => {
    // Cargar papas fritas desde el backend
    fetch(`${VITE_API_HOST}/api/papas-fritas`)
      .then(response => response.json())
      .then(data => setPapasFritas(data))
      .catch(error => console.error('Error al cargar las papas fritas:', error));
  }, []);

  const fetchInsumos = () => {
    fetch(`${VITE_API_HOST}/api/insumos`)  // GET al endpoint de insumos
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

  const onSubmit = async (data) => {
    data.disponible = data.disponible;
  
    const detalleInsumos = selectedInsumos
        .filter(insumo => insumo.cantidad > 0)
        .map(insumo => ({
          insumoId: insumo.insumoId,
          cantidad: parseInt(insumo.cantidad, 10),
        }));
  
    data.detalleInsumos = detalleInsumos;
  
    if (data.imagenPapasFritas && data.imagenPapasFritas.length > 0) {
      const file = data.imagenPapasFritas[0];
      const storage = getStorage();
      const fileName = `papas-${uuidv4()}`;
      const storageRef = ref(storage, `papas-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
          (snapshot) => {
            // Progress function
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            data.urlImagen = downloadURL;
  
            // Enviar el DTO al backend
            const url = selectedPapasFritas ?
                `${VITE_API_HOST}/api/papas-fritas/editar/${selectedPapasFritas.id}` :
                `${VITE_API_HOST}/api/papas-fritas/registrar`;
  
            const method = selectedPapasFritas ? 'PUT' : 'POST';
  
            fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
                .then(response => response.ok ? response.text() : response.text().then(text => { throw new Error(text); }))
                .then(message => {
                  Swal.fire({
                    icon: 'success',
                    title: selectedPapasFritas ? 'Edición exitosa' : 'Registro exitoso',
                    text: message,
                  });
                  reset();
                  setSelectedPapasFritas(null);
                  setImagePreview(null);
                  setSelectedInsumos([]); // Limpiar el estado de selectedInsumos
                  return fetch(`${VITE_API_HOST}/api/papas-fritas`)
                      .then(response => response.json())
                      .then(data => setPapasFritas(data));
                })
                .catch(error => Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al enviar los datos',
                }));
          }
      );
    } else {
      // Asignar URL predeterminada si no se ha seleccionado una imagen
      data.urlImagen = "https://firebasestorage.googleapis.com/v0/b/bigbite-55224.appspot.com/o/imagen-producto-default.png?alt=media&token=d6df8d5d-e999-4139-9ac0-b168ce0f316a";
  
      // Enviar el DTO al backend sin imagen
      const url = selectedPapasFritas ?
          `${VITE_API_HOST}/api/papas-fritas/editar/${selectedPapasFritas.id}` :
          `${VITE_API_HOST}/api/papas-fritas/registrar`;
  
      const method = selectedPapasFritas ? 'PUT' : 'POST';
  
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
          .then(response => response.ok ? response.text() : response.text().then(text => { throw new Error(text); }))
          .then(message => {
            Swal.fire({
              icon: 'success',
              title: selectedPapasFritas ? 'Edición exitosa' : 'Registro exitoso',
              text: message,
            });
            reset();
            setSelectedPapasFritas(null);
            setImagePreview(null);
            setSelectedInsumos([]); // Limpiar el estado de selectedInsumos
            return fetch(`${VITE_API_HOST}/api/papas-fritas`)
                .then(response => response.json())
                .then(data => setPapasFritas(data));
          })
          .catch(error => Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al enviar los datos',
          }));
    }
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

    // Establecer insumos con sus cantidades
    if (papasFritas.insumos && papasFritas.insumos.length > 0) {
      const insumosConCantidad = papasFritas.insumos.map(detalle => ({
        insumoId: detalle.insumo.id,
        cantidad: detalle.cantidad
      }));
      setSelectedInsumos(insumosConCantidad);
    } else {
      setSelectedInsumos([]);
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