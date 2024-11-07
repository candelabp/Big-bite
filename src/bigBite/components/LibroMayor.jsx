import React from "react";
import '../css/libroMayor.css';

const LibroMayor = ({ asientos }) => {
  // Agrupar los asientos por cuenta
  const agrupadoPorCuenta = asientos.reduce((acc, asiento) => {
    asiento.cuentasAsiento.forEach((detalle) => {
      if (!acc[detalle.cuenta.nombre]) {
        acc[detalle.cuenta.nombre] = [];
      }
      acc[detalle.cuenta.nombre].push({
        fecha: asiento.fecha,
        descripcion: asiento.descripcion,
        monto: detalle.monto,
        tipo: detalle.tipo,
      });
    });
    return acc;
  }, {});

  return (
    <div className="libro-mayor">
      <h2 className="libro-mayor__titulo">LIBRO MAYOR</h2>
      {Object.entries(agrupadoPorCuenta).map(([nombreCuenta, movimientos], index) => {
        const totalDebe = movimientos
          .filter((mov) => mov.tipo === "Debe")
          .reduce((acc, mov) => acc + mov.monto, 0);
        const totalHaber = movimientos
          .filter((mov) => mov.tipo === "Haber")
          .reduce((acc, mov) => acc + mov.monto, 0);
        const saldoFinal = totalDebe - totalHaber;

        return (
          <div className="libro-mayor__cuenta" key={index}>
            <h3 className="libro-mayor__nombre-cuenta">{nombreCuenta}</h3>
            <table className="libro-mayor__tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Debe</th>
                  <th>Haber</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((mov, i) => (
                  <tr key={i}>
                    <td>{mov.fecha}</td>
                    <td>{mov.descripcion}</td>
                    <td>{mov.tipo === "Debe" ? `$${mov.monto.toFixed(2)}` : ""}</td>
                    <td>{mov.tipo === "Haber" ? `$${mov.monto.toFixed(2)}` : ""}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="libro-mayor__saldo-final">Saldo Final</td>
                  <td colSpan="2" className="libro-mayor__saldo-final-valor">
                    ${saldoFinal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default LibroMayor;
