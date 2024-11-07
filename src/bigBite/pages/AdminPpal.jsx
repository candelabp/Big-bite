import { useState, useEffect } from 'react';
import '../css/adminPpal.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavbarAdmin from '../components/NavbarAdmin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ResumenMensual = ({ data }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.fecha.toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = { name: month, ingreso: 0, egreso: 0 };
      }
      if (curr.tipoCuenta === "Ingreso") {
        acc[month].ingreso += curr.monto;
      } else if (curr.tipoCuenta === "Egreso") {
        acc[month].egreso += curr.monto;
      }
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
  const [asientos, setAsientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('diario');

  const fetchAsientos = async () => {
    try {
      const response = await fetch('http://localhost:8080/asientos');
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const text = await response.text();
      console.log("Contenido de la respuesta:", text);
      const data = JSON.parse(text);

      const ingresosEgresos = data.flatMap(asiento => asiento.cuentasAsiento
        .filter(cuenta => cuenta.cuenta.tipoCuenta === "Ingreso" || cuenta.cuenta.tipoCuenta === "Egreso")
        .map(cuenta => ({
          monto: cuenta.monto,
          tipoCuenta: cuenta.cuenta.tipoCuenta,
          fecha: new Date(asiento.fecha)
        }))
      );

      setAsientos(ingresosEgresos);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los asientos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsientos();
  }, []);

  useEffect(() => {
    const filtered = asientos.filter(item => item.fecha >= startDate && item.fecha <= endDate);

    const groupedByDate = filtered.reduce((acc, curr) => {
      const date = curr.fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      if (!acc[date]) {
        acc[date] = { name: date, ingreso: 0, egreso: 0 };
      }
      if (curr.tipoCuenta === "Ingreso") {
        acc[date].ingreso += curr.monto;
      } else if (curr.tipoCuenta === "Egreso") {
        acc[date].egreso += curr.monto;
      }
      return acc;
    }, {});

    setFilteredData(Object.values(groupedByDate));
  }, [asientos, startDate, endDate]);

  return (
    <>
      <NavbarAdmin />
      <div className="admin-container">
        <h1>Resumen Financiero</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('diario')} className={activeTab === 'diario' ? 'active' : ''}>Día a Día</button>
          <button onClick={() => setActiveTab('mensual')} className={activeTab === 'mensual' ? 'active' : ''}>Por Mes</button>
        </div>

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
          <ResumenMensual data={asientos} />
        )}
      </div>
    </>
  );
};
