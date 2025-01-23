import React from "react";
import '../css/libroDiario.css';

const LibroDiario = ({ asientos }) => {
  return (
    <div className="libro-diario">
      <h2 className="libro-diario__titulo">LIBRO DIARIO</h2>
      <table className="libro-diario__tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Cuenta</th>
            <th>Monto</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {asientos.map((asiento, index) => (
            asiento.cuentasAsiento.map((detalle, i) => (
              <tr key={`${index}-${i}`}>
                {/* Mostrar fecha y descripción solo en la primera fila del asiento */}
                {i === 0 ? (
                  <>
                    <td rowSpan={asiento.cuentasAsiento.length}>{asiento.fecha}</td>
                    <td rowSpan={asiento.cuentasAsiento.length}>{asiento.descripcion}</td>
                  </>
                ) : (
                  // Celdas vacías para las filas adicionales del mismo asiento
                  <>
                    <td style={{ display: 'none' }}></td>
                    <td style={{ display: 'none' }}></td>
                  </>
                )}
                <td>{detalle.cuenta.nombre}</td>
                <td>{detalle.monto}</td>
                <td>{detalle.tipo}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibroDiario;
