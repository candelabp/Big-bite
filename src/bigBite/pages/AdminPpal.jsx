import  { useState } from 'react';
import '../css/adminPpal.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import burger1 from '../assets/burger1.png';
import burger2 from '../assets/burger2.png';
import burger3 from '../assets/burger3.png';

export const AdminPpal = () => {
  // Estado para manejar la búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen Financiero");
    XLSX.writeFile(workbook, "reporte_financiero.xlsx");
  };

  const data = [
    { name: 'Enero', ingreso: 2400, egreso: 1000},
    { name: 'Febrero', ingreso: 1398, egreso: 500},
    { name: 'Marzo', ingreso: 9800, egreso: 4580},
    { name: 'Abril', ingreso: 3908, egreso: 800},
    { name: 'Mayo', ingreso: 4800, egreso: 3000},
    { name: 'Junio', ingreso: 3800, egreso: 1250},
    { name: 'Julio', ingreso: 5500, egreso: 2340},
    { name: 'Agosto', ingreso: 7300, egreso: 4780},
    { name: 'Septiembre', ingreso: 2300, egreso: 678}
  ];

  // Calcular los totales
  const totalIngresos = data.reduce((acc, curr) => acc + curr.ingreso, 0);
  const totalEgresos = data.reduce((acc, curr) => acc + curr.egreso, 0);
  const beneficioNeto = totalIngresos - totalEgresos;

  const productos = [
    { nombre: 'Classic Burger', precio: '$5.99',imagen:burger1,stock:'10' },
    { nombre: 'Bacon Burger', precio: '$7.99',imagen:burger2,stock:'10' },
    { nombre: 'Veggie Burger', precio: '$6.39',imagen:burger3,stock:'10' },
    { nombre: 'Chicken Burger', precio: '$8.29',imagen:burger1,stock:'10' },
    { nombre: 'Steak Burger', precio: '$9.99',imagen:burger2,stock:'10' },
    { nombre: 'Classic Burger', precio: '$5.99',imagen:burger1,stock:'10' },
    { nombre: 'Bacon Burger', precio: '$7.99',imagen:burger2,stock:'10' },
    { nombre: 'Veggie Burger', precio: '$6.39',imagen:burger3,stock:'10' },
  ];

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1>Resumen Financiero</h1>
      <button className="btn-reporte" onClick={exportToExcel}>Exportar a Excel</button>
      
      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ingreso" fill="#DF1C1C" />
          <Bar dataKey="egreso" fill="#FFBA49" />
        </BarChart>
      </ResponsiveContainer>

      {/* Detalles financieros */}
      <div className="detalles">
        <div className="item-detalle">
          <p><b>TOTAL INGRESOS</b></p>
          <p>${totalIngresos.toLocaleString()}</p>
        </div>
        <div className="item-detalle">
          <p><b>TOTAL GASTOS</b></p>
          <p>${totalEgresos.toLocaleString()}</p>
        </div>
        <div className="item-detalle">
          <p><b>BENEFICIO NETO</b></p>
          <p>${beneficioNeto.toLocaleString()}</p>
        </div>
      </div>

      <h1 className="lista-productos">Lista de productos</h1>

      {/* Campo de búsqueda */}
      <input 
        type="text" 
        placeholder="Buscar productos..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ padding: '10px', width: '100%', maxWidth: '300px', margin: '20px auto', display: 'block' }}
      />
      
      {/* Grilla de productos */}
      <div className="grilla-productos">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto, index) => (
            <div className="producto-item" key={index}>
                 <img src={producto.imagen} alt={producto.nombre} style={{ width: '100px', height: '100px' }} />   
              <p><b>{producto.nombre}</b></p>
              <p>stock: {producto.stock}</p>
              <p>{producto.precio}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};
