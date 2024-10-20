import { useState, useEffect } from 'react';
import '../css/adminPpal.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavbarAdmin from '../components/NavbarAdmin';
import ExcelJS from 'exceljs';

export const AdminPpal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hamburguesas, setHamburguesas] = useState([]);
  const [loading, setLoading] = useState(true);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resumen Financiero');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'Mes', key: 'name', width: 15 },
      { header: 'Ingreso', key: 'ingreso', width: 15 },
      { header: 'Egreso', key: 'egreso', width: 15 }
    ];

    // Agregar datos
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Guardar el archivo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'reporte_financiero.xlsx';
      link.click();
    });
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

  // El resto de tu código...
  // Calcular los totales
  const totalIngresos = data.reduce((acc, curr) => acc + curr.ingreso, 0);
  const totalEgresos = data.reduce((acc, curr) => acc + curr.egreso, 0);
  const beneficioNeto = totalIngresos - totalEgresos;

  useEffect(() => {
    const fetchHamburguesas = async () => {
      try {
        const response = await fetch('http://localhost:8080/hamburguesas');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setHamburguesas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las hamburguesas:', error);
        setLoading(false);
      }
    };

    fetchHamburguesas();
  }, []);

  const filteredProducts = hamburguesas.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarAdmin />
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

        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ padding: '10px', width: '100%', maxWidth: '300px', margin: '20px auto', display: 'block' }}
        />
        
        <div className="grilla-productos">
          {loading ? (
            <p>Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((producto, index) => (
              <div className="producto-item" key={index}>
                <img src={producto.urlImagen} alt={producto.nombre} style={{ width: '100px', height: '100px' }} />
                <p><b>{producto.nombre}</b></p>
                <p>stock: {producto.stock}</p>
                <p>${producto.precio.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
    </>
  );
};
