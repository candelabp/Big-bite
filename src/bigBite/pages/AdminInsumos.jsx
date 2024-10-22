import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import '../css/adminProductos.css';
import NavbarAdmin from '../components/NavbarAdmin';

export const AdminInsumos = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [insumos, setInsumos] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cargar insumos desde el backend
    fetch('http://localhost:8080/insumos')
      .then(response => response.json())
      .then(data => setInsumos(data))
      .catch(error => console.error('Error al cargar los insumos:', error));
  }, []);

  const onSubmit = (data) => {
    const url = selectedInsumo ?
      `http://localhost:8080/insumos/editar/${selectedInsumo.id}` :
      'http://localhost:8080/insumos/agregar';

    const method = selectedInsumo ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
      })
      .then(message => {
        console.log('Respuesta del servidor:', message);
        alert(selectedInsumo ? 'Edición exitosa' : 'Registro exitoso');
        reset();
        setSelectedInsumo(null);
        return fetch('http://localhost:8080/insumos')
          .then(response => response.json())
          .then(data => setInsumos(data));
      })
      .catch(error => {
        console.error('Hubo un error:', error);
        alert('Error al enviar los datos');
      });
  };

  const editarInsumo = (insumo) => {
    setSelectedInsumo(insumo);
    setValue('nombre', insumo.nombre);
    setValue('precio', insumo.precio);
    setValue('stock', insumo.stock);
    setValue('unidadMedida', insumo.unidadMedida);
    setIsModalOpen(false);
  };

  // Verifica si todos los campos requeridos están llenos
  const isFormComplete = () => {
    const requiredFields = ['nombre', 'precio', 'stock', 'unidadMedida'];
    return requiredFields.every(field => watch(field) !== undefined && watch(field) !== null && watch(field) !== '');
  };

  return (
    <>
      <NavbarAdmin />
      <div className="contenedor-admin">
        <header className="admin-header">
          <h1>Administrar Insumos</h1>
          <p>Agrega o edita insumos</p>
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
          <h2>{selectedInsumo ? 'Editar Insumo' : 'Registrar Insumo'}</h2>
          <form className='form-producto' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className='label-producto'>Nombre:</label>
              <input className='input-producto' {...register("nombre", { required: "El nombre es obligatorio" })} />
              {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Precio:</label>
              <input className='input-producto' type="number" step="0.01" {...register("precio", { required: "El precio es obligatorio" })} />
              {errors.precio && <span className="error-message">{errors.precio.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Stock:</label>
              <input className='input-producto' type="number" step="0.01" {...register("stock", { required: "El stock es obligatorio" })} />
              {errors.stock && <span className="error-message">{errors.stock.message}</span>}
            </div>
            <div>
              <label className='label-producto'>Unidad de Medida:</label>
              <select className='input-producto' {...register("unidadMedida", { required: "Selecciona una unidad de medida" })}>
                <option value="">Seleccionar</option>
                <option value="UNIDADES">UNIDADES</option>
                <option value="KG">KG</option>
              </select>
              {errors.unidadMedida && <span className="error-message">{errors.unidadMedida.message}</span>}
            </div>

            <div className='content-buttons-adminProducts' style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}>
              <button type="submit" disabled={!isFormComplete()} className={`btnRegistrarHamburguesa ${!isFormComplete() ? 'disabled' : ''}`}>
                {selectedInsumo ? 'Editar Insumo' : 'Registrar Insumo'}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="btnRegistrarHamburguesa">
                Editar Insumo existente
              </button>
            </div>
          </form>
        </section>

        {/* Modal para seleccionar Insumos */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Selecciona un Insumo</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              <div className="modal-body">
                {insumos.map(insumo => (
                  <div key={insumo.id} className="product-item">
                    <div className="product-details">
                      <p><strong>{insumo.nombre}</strong></p>
                      <p>Precio: ${insumo.precio}</p>
                      <button className="btnRegistrarHamburguesa" onClick={() => editarInsumo(insumo)}>Editar</button>
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
