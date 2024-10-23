import { useState, useEffect } from 'react';
import '../css/adminPpal.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavbarAdmin from '../components/NavbarAdmin';
import ExcelJS from 'exceljs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ResumenMensual = ({ data }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.date.toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = { name: month, ingreso: 0, egreso: 0 };
      }
      acc[month].ingreso += curr.ingreso;
      acc[month].egreso += curr.egreso;
      return acc;
    }, {});

    setMonthlyData(Object.values(groupedData));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingreso" fill="#DF1C1C" />
        <Bar dataKey="egreso" fill="#FFBA49" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const AdminPpal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hamburguesas, setHamburguesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('diario');

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resumen Financiero');

    worksheet.columns = [
      { header: 'Fecha', key: 'name', width: 15 },
      { header: 'Ingreso', key: 'ingreso', width: 15 },
      { header: 'Egreso', key: 'egreso', width: 15 }
    ];

    filteredData.forEach((item) => {
      worksheet.addRow(item);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'reporte_financiero.xlsx';
      link.click();
    });
  };

  const data = [
    { ingreso: 2400, egreso: 1000, date: new Date(2024, 0, 1) },
    { ingreso: 1398, egreso: 500, date: new Date(2024, 1, 1) },
    { ingreso: 9800, egreso: 4580, date: new Date(2024, 2, 1) },
    { ingreso: 3908, egreso: 800, date: new Date(2024, 3, 1) },
    { ingreso: 4800, egreso: 3000, date: new Date(2024, 4, 1) },
    { ingreso: 3800, egreso: 1250, date: new Date(2024, 5, 1) },
    { ingreso: 5500, egreso: 2340, date: new Date(2024, 6, 1) },
    { ingreso: 7300, egreso: 4780, date: new Date(2024, 7, 1) },
    { ingreso: 2300, egreso: 678, date: new Date(2024, 8, 1) }
  ];

  useEffect(() => {
    const filtered = data.filter((item) => item.date >= startDate && item.date <= endDate);
    const formattedData = filtered.length > 0 ? filtered : data;

    const updatedData = formattedData.map((item) => ({
      ...item,
      name: item.date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }));

    setFilteredData(updatedData);
  }, [startDate, endDate]);

  const totalIngresos = filteredData.reduce((acc, curr) => acc + curr.ingreso, 0);
  const totalEgresos = filteredData.reduce((acc, curr) => acc + curr.egreso, 0);
  const beneficioNeto = totalIngresos - totalEgresos;

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

  useEffect(() => {
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
        <div className="tabs">
          <button onClick={() => setActiveTab('diario')} className={activeTab === 'diario' ? 'active' : ''}>Día a Día</button>
          <button onClick={() => setActiveTab('mensual')} className={activeTab === 'mensual' ? 'active' : ''}>Por Mes</button>
        </div>

        {/* Selección de rango de fechas en "Día a Día" */}
        {activeTab === 'diario' && (
          <div className="date-range">
            <p>Filtrar por rango de fechas:</p>
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        )}

        {activeTab === 'diario' ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ingreso" fill="#DF1C1C" />
              <Bar dataKey="egreso" fill="#FFBA49" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResumenMensual data={data} />
        )}
      </div>
    </>
  );
};
