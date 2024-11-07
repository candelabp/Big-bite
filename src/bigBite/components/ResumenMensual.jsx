import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResumenMensual = ({ data }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Agrupar los datos por mes
    const groupedData = data.reduce((acc, curr) => {
      const month = curr.date.toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = { name: month, ingreso: 0, egreso: 0 };
      }
      acc[month].ingreso += curr.ingreso;
      acc[month].egreso += curr.egreso;
      return acc;
    }, {});

    // Convertir el objeto a un array para el gráfico
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

export default ResumenMensual;
