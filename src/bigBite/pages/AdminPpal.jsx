import '../css/adminPpal.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

// ejemplos jeje
const data = [
  { name: 'Enero', ingreso: 2400, egreso: 1000},
  { name: 'Febrero', ingreso: 1398, egreso: 500},
  { name: 'Marzo', ingreso: 9800, egreso: 4580},
  { name: 'Abril', ingreso: 3908, egreso: 800},
  { name: 'Mayo', ingreso: 4800, egreso: 3000},
  { name: 'Junio',ingreso: 3800, egreso: 1250},
  { name: 'Julio', ingreso: 5500, egreso: 2340},
  { name: 'Agosto',ingreso: 7300, egreso: 4780},
  { name: 'Septiembre', ingreso: 2300, egreso: 678}
];

export const AdminPpal = () => {
    const exportToExcel = () => {
        // Crea un libro de trabajo
        const workbook = XLSX.utils.book_new();
      
        // Convierte los datos en una hoja de trabajo
        const worksheet = XLSX.utils.json_to_sheet(data);
      
        // Agrega la hoja de trabajo al libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen Financiero");
      
        // Exporta el archivo de Excel
        XLSX.writeFile(workbook, "reporte_financiero.xlsx");
      };

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
 <div className='detalles'>
  <div className="item-detalle">
      <p><b>Total ingresos</b> </p>
      <p>$10,000</p>
      </div>
      <div className="item-detalle">
      <p> <b>Total gastos</b> </p> 
      <p>$5,000</p>
      </div>
      <div className='item-detalle'>
      <p><b>Beneficio neto</b></p>
      <p>$5,000</p>
      </div>
    </div>
    <h1>Lista de productos</h1>
     
    </div>
   

  );
};
