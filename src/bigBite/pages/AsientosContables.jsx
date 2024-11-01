import React, { useState } from "react";
import '../css/asientosContables.css';
import NavbarAdmin from "../components/NavbarAdmin";

export const AsientosContables = () => {
  const [cuenta, setCuenta] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [asientos, setAsientos] = useState([]);
  const [cuentasDebe, setCuentasDebe] = useState([]);
  const [cuentasHaber, setCuentasHaber] = useState([]);

  const handleAddCuenta = () => {
    if (monto && tipo && cuenta) {
      const nuevaCuenta = { cuenta, monto: parseFloat(monto), tipo };
      if (tipo === "Debe") {
        setCuentasDebe([...cuentasDebe, nuevaCuenta]);
      } else {
        setCuentasHaber([...cuentasHaber, nuevaCuenta]);
      }
      setCuenta("");
      setMonto("");
      setTipo("");
    }
  };

  const handleGuardarAsiento = () => {
    const nuevoAsiento = {
      fecha,
      descripcion,
      debe: cuentasDebe,
      haber: cuentasHaber,
    };
    setAsientos([...asientos, nuevoAsiento]);
    setCuentasDebe([]);
    setCuentasHaber([]);
    setDescripcion("");
  };

  const calcularTotal = (cuentas) => {
    return cuentas.reduce((acc, cuenta) => acc + cuenta.monto, 0);
  };

  const isBalanceado = () => {
    return calcularTotal(cuentasDebe) === calcularTotal(cuentasHaber);
  };

  const isAgregarCuentaEnabled = cuenta && monto && tipo;
  const isGuardarAsientoEnabled = descripcion && isBalanceado() && cuentasDebe.length > 0 && cuentasHaber.length > 0;

  return (
    <>
      <NavbarAdmin />
      <div className="asientos-contables">
        <div className="asientos-contables-header">
          <h1 className="asientos-contables__titulo">Registrar Asientos Contables</h1>
          <p className="asientos-contables__subtitulo">Complete los campos con la información necesaria</p>
        </div>

        <div className="asientos-contables__formulario">
          <div className="asientos-contables__campo">
            <label>Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="asientos-contables__campo">
            <label>Descripción:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ingrese una descripción"
            />
          </div>
          <div className="asientos-contables__campo">
            <label>Cuenta:</label>
            <select value={cuenta} onChange={(e) => setCuenta(e.target.value)}>
              <option value="">Seleccione una cuenta</option>
              <option value="Cuenta 1">Cuenta 1</option>
              <option value="Cuenta 2">Cuenta 2</option>
            </select>
          </div>
          <div className="asientos-contables__campo">
            <label>Monto:</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => {
                const valor = parseFloat(e.target.value);
                if (valor >= 1 || e.target.value === "") {
                  setMonto(e.target.value);
                }
              }}
              placeholder="Ingrese el monto del asiento"
              min="1"
              step="0.01"
            />
          </div>
          <div className="asientos-contables__campo">
            <label>Tipo:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Seleccione el tipo</option>
              <option value="Debe">Debe</option>
              <option value="Haber">Haber</option>
            </select>
          </div>
          <button
            onClick={handleAddCuenta}
            className="asientos-contables__boton"
            disabled={!isAgregarCuentaEnabled}
          >
            Agregar Cuenta
          </button>
          <button
            onClick={handleGuardarAsiento}
            className="asientos-contables__boton"
            disabled={!isGuardarAsientoEnabled}
          >
            Guardar Asiento
          </button>
        </div>

        <h2 className="asientos-contables__libro-titulo">Libro Diario</h2>
        <table className="asientos-contables__tabla">
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
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan={asiento.debe.length + asiento.haber.length}>
                    {asiento.fecha}
                  </td>
                  <td rowSpan={asiento.debe.length + asiento.haber.length}>
                    {asiento.descripcion}
                  </td>
                  {asiento.debe.length > 0 && (
                    <>
                      <td>{asiento.debe[0].cuenta}</td>
                      <td>${asiento.debe[0].monto.toFixed(2)}</td>
                      <td>Debe</td>
                    </>
                  )}
                </tr>

                {asiento.debe.slice(1).map((cuenta, idx) => (
                  <tr key={`${index}-debe-${idx}`}>
                    <td>{cuenta.cuenta}</td>
                    <td>${cuenta.monto.toFixed(2)}</td>
                    <td>Debe</td>
                  </tr>
                ))}

                {asiento.haber.map((cuenta, idx) => (
                  <tr key={`${index}-haber-${idx}`}>
                    <td>{cuenta.cuenta}</td>
                    <td>${cuenta.monto.toFixed(2)}</td>
                    <td>Haber</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
