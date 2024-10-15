import { useState } from 'react';
import '../css/adminProductos.css';

export const AdminProductos = () => {
  // Lista de hamburguesas
  const [hamburguesas, setHamburguesas] = useState([
    {
      nombre: 'Mega Crunch',
      precio: '$9.99',
      tiempoPreparacion: '10 mins',
      precioCombo: '$12.99',
      descripcion: 'Hamburguesa con queso',
      stock: 20,
      imagen: '', // Nueva propiedad para la imagen
    },
    {
      nombre: 'Classic Burger',
      precio: '$5.99',
      tiempoPreparacion: '8 mins',
      precioCombo: '$9.99',
      descripcion: 'Hamburguesa clásica con carne',
      stock: 15,
      imagen: '',
    },
    {
      nombre: 'Bacon Burger',
      precio: '$7.99',
      tiempoPreparacion: '12 mins',
      precioCombo: '$10.99',
      descripcion: 'Hamburguesa con bacon y queso',
      stock: 10,
      imagen: '',
    },
  ]);

  // Estado para la hamburguesa seleccionada
  const [selectedHamburguesa, setSelectedHamburguesa] = useState(null);

  // Estado para la nueva hamburguesa
  const [newHamburguesa, setNewHamburguesa] = useState({
    nombre: '',
    precio: '',
    tiempoPreparacion: '',
    precioCombo: '',
    descripcion: '',
    stock: '',
    imagen: '', // Nueva propiedad para la imagen
  });

  // Maneja la selección de la hamburguesa en el menú desplegable
  const handleSelectChange = (e) => {
    const selectedName = e.target.value;
    const foundHamburguesa = hamburguesas.find((h) => h.nombre === selectedName);
    setSelectedHamburguesa(foundHamburguesa);
  };

  // Maneja los cambios en los campos autocompletados
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedHamburguesa({
      ...selectedHamburguesa,
      [name]: value,
    });
  };

  // Maneja los cambios en los campos de la nueva hamburguesa
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewHamburguesa({
      ...newHamburguesa,
      [name]: value,
    });
  };

  // Maneja el cambio de imagen al agregar una nueva hamburguesa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewHamburguesa({
        ...newHamburguesa,
        imagen: reader.result, // Guardar la URL de la imagen
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Maneja el cambio de imagen al editar una hamburguesa existente
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedHamburguesa({
        ...selectedHamburguesa,
        imagen: reader.result, // Actualizar la URL de la imagen
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Maneja el envío del formulario de nueva hamburguesa
  const handleAddHamburguesa = (e) => {
    e.preventDefault();
    setHamburguesas([...hamburguesas, newHamburguesa]);
    setNewHamburguesa({
      nombre: '',
      precio: '',
      tiempoPreparacion: '',
      precioCombo: '',
      descripcion: '',
      stock: '',
      imagen: '', // Limpiar el campo de imagen
    });
  };

  const toggleDisponible = () => {
    setSelectedHamburguesa({
      ...selectedHamburguesa,
      disponible: !selectedHamburguesa.disponible,
    });
  };

  return (
    <div className="contenedor-admin">
      <header className="admin-header">
        <h1>Gestioná los productos</h1>
        <p>Agrega, actualiza o elimina fácilmente productos de la carta</p>
        <div className="botones">
          <button className="btn-edit">Editar producto existente</button>
          <button className="btn-create">Crear nuevo producto</button>
        </div>
      </header>

      {/* Menú desplegable para seleccionar la hamburguesa */}
      <div className='contenedor-formulario'>
        <label>Elegir hamburguesa:</label>
        <select onChange={handleSelectChange}>
          <option value="">Seleccione una hamburguesa</option>
          {hamburguesas.map((hamburguesa, index) => (
            <option key={index} value={hamburguesa.nombre}>
              {hamburguesa.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Solo mostrar el formulario si se selecciona una hamburguesa */}
      {selectedHamburguesa && (
        <div className='editar-hamburguesa'>
          <h2>Editar Hamburguesa</h2>

          <form>
            <label>Nombre de la hamburguesa</label>
            <input
              type="text"
              name="nombre"
              value={selectedHamburguesa.nombre}
              onChange={handleInputChange}
            />

            <label>Precio</label>
            <input
              type="text"
              name="precio"
              value={selectedHamburguesa.precio}
              onChange={handleInputChange}
            />

            <label>Tiempo de preparación</label>
            <input
              type="text"
              name="tiempoPreparacion"
              value={selectedHamburguesa.tiempoPreparacion}
              onChange={handleInputChange}
            />

            <label>Precio combo</label>
            <input
              type="text"
              name="precioCombo"
              value={selectedHamburguesa.precioCombo}
              onChange={handleInputChange}
            />

            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={selectedHamburguesa.descripcion}
              onChange={handleInputChange}
            />

            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={selectedHamburguesa.stock}
              onChange={handleInputChange}
            />

            <label>Imagen actual</label>
            {selectedHamburguesa.imagen && (
              <div className="imagen-miniatura">
                <img src={selectedHamburguesa.imagen} alt="Miniatura" className="imagen-hamburguesa" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />

            <button type="button" onClick={toggleDisponible}>
              {selectedHamburguesa.disponible ? 'Disponible' : 'No Disponible'}
            </button>

            <button type="submit">Actualizar</button>
          </form>
        </div>
      )}

      {/* Sección Agregar Hamburguesas */}
      <div className="agregar-hamburguesa">
        <h2>Agregar Hamburguesas</h2>
        <div className="form-container">
          <form className="product-form" onSubmit={handleAddHamburguesa}>
            <label>
              <span>Nombre de la hamburguesa</span>
              <input
                type="text"
                name="nombre"
                value={newHamburguesa.nombre}
                onChange={handleNewInputChange}
                placeholder="Ej. Mega Crunch"
              />
            </label>

            <label>
              <span>Precio</span>
              <input
                type="text"
                name="precio"
                value={newHamburguesa.precio}
                onChange={handleNewInputChange}
                placeholder="Ej. $9.99"
              />
            </label>

            <label>
              <span>Tiempo de preparación</span>
              <input
                type="text"
                name="tiempoPreparacion"
                value={newHamburguesa.tiempoPreparacion}
                onChange={handleNewInputChange}
                placeholder="Ej. 10 mins"
              />
            </label>

            <label>
              <span>Precio combo</span>
              <input
                type="text"
                name="precioCombo"
                value={newHamburguesa.precioCombo}
                onChange={handleNewInputChange}
                placeholder="Ej. $12.99"
              />
            </label>

            <label>
              <span>Descripción</span>
              <input
                type="text"
                name="descripcion"
                value={newHamburguesa.descripcion}
                onChange={handleNewInputChange}
                placeholder="Ej. Hamburguesa con queso"
              />
            </label>

            <label>
              <span>Stock</span>
              <input
                type="number"
                name="stock"
                value={newHamburguesa.stock}
                onChange={handleNewInputChange}
                placeholder="Ej. 20"
              />
            </label>

            <label>
              <span>Imagen</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-add">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}