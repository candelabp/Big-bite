import { useState, useEffect } from 'react';
import '../css/adminProductos.css';

export const AdminProductos = () => {
  const [hamburguesas, setHamburguesas] = useState([]);
  const [selectedHamburguesa, setSelectedHamburguesa] = useState(null);
  const [newHamburguesa, setNewHamburguesa] = useState({
    nombre: '',
    precio: '',
    tiempoPreparacion: '',
    precioCombo: '',
    descripcion: '',
    stock: '',
    imagen: '',
  });

  // Obtener las hamburguesas desde el backend
  useEffect(() => {
    fetch('/api/hamburguesas')
      .then((response) => response.json())
      .then((data) => setHamburguesas(data))
      .catch((error) => console.error('Error al obtener las hamburguesas:', error));
  }, []);

  const handleSelectChange = (e) => {
    const selectedName = e.target.value;
    const foundHamburguesa = hamburguesas.find((h) => h.nombre === selectedName);
    setSelectedHamburguesa(foundHamburguesa);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedHamburguesa({
      ...selectedHamburguesa,
      [name]: value,
    });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewHamburguesa({
      ...newHamburguesa,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewHamburguesa({
        ...newHamburguesa,
        imagen: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddHamburguesa = (e) => {
    e.preventDefault();
    fetch('/api/hamburguesas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHamburguesa),
    })
      .then((response) => response.json())
      .then((data) => {
        setHamburguesas([...hamburguesas, data]);
        setNewHamburguesa({
          nombre: '',
          precio: '',
          tiempoPreparacion: '',
          precioCombo: '',
          descripcion: '',
          stock: '',
          imagen: '',
        });
      })
      .catch((error) => console.error('Error al agregar la hamburguesa:', error));
  };

  const handleEditHamburguesa = (e) => {
    e.preventDefault();
    fetch(`/api/hamburguesas/${selectedHamburguesa.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedHamburguesa),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedHamburguesas = hamburguesas.map((h) =>
          h.id === data.id ? data : h
        );
        setHamburguesas(updatedHamburguesas);
        setSelectedHamburguesa(null);
      })
      .catch((error) => console.error('Error al actualizar la hamburguesa:', error));
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

      {/* Formulario para editar hamburguesa */}
      {selectedHamburguesa && (
        <div className='editar-hamburguesa'>
          <h2>Editar Hamburguesa</h2>
          <form onSubmit={handleEditHamburguesa}>
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

            <div>
              <img
                src={selectedHamburguesa.imagen || 'https://via.placeholder.com/150'}
                alt="Miniatura de hamburguesa"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <input type="file" onChange={handleImageChange} />
            </div>

            <button type="submit">Actualizar</button>
          </form>
        </div>
      )}

      {/* Formulario para agregar hamburguesa */}
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
              <input type="file" onChange={handleImageChange} />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-add">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
