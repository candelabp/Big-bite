import React, { useState, useEffect } from "react";
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
  const [mostrarLibro, setMostrarLibro] = useState("diario"); // Estado para controlar qué libro mostrar
  const [cuentas, setCuentas] = useState([]); // Estado para las cuentas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar cuentas desde el servidor
  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await fetch('http://localhost:8080/cuentas'); // Asegúrate de que esta URL es correcta
        if (!response.ok) {
          throw new Error('Error al obtener las cuentas');
        }
        const data = await response.json();
        setCuentas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, []);

  const generarLibroMayor = () => {
    const libroMayor = {};

    asientos.forEach((asiento) => {
      asiento.debe.forEach((cuenta) => {
        if (!libroMayor[cuenta.cuenta]) {
          libroMayor[cuenta.cuenta] = { movimientos: [], saldo: 0 };
        }
        libroMayor[cuenta.cuenta].movimientos.push({
          fecha: asiento.fecha,
          descripcion: asiento.descripcion,
          monto: cuenta.monto,
          tipo: "Debe",
        });
        libroMayor[cuenta.cuenta].saldo += cuenta.monto;
      });

      asiento.haber.forEach((cuenta) => {
        if (!libroMayor[cuenta.cuenta]) {
          libroMayor[cuenta.cuenta] = { movimientos: [], saldo: 0 };
        }
        libroMayor[cuenta.cuenta].movimientos.push({
          fecha: asiento.fecha,
          descripcion: asiento.descripcion,
          monto: cuenta.monto,
          tipo: "Haber",
        });
        libroMayor[cuenta.cuenta].saldo -= cuenta.monto;
      });
    });

    return libroMayor;
  };

  const mostrarLibroMayor = () => {
    const libroMayor = generarLibroMayor();
    return (
      <div className="libro-mayor">
        <h2>Libro Mayor</h2>
        {Object.entries(libroMayor).map(([cuenta, data], index) => (
          <div key={index} className="libro-mayor__cuenta">
            <h3>{cuenta}</h3>
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
                {data.movimientos.map((movimiento, idx) => (
                  <tr key={idx}>
                    <td>{movimiento.fecha}</td>
                    <td>{movimiento.descripcion}</td>
                    <td>{movimiento.tipo === "Debe" ? `$${movimiento.monto.toFixed(2)}` : ""}</td>
                    <td>{movimiento.tipo === "Haber" ? `$${movimiento.monto.toFixed(2)}` : ""}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2"><strong>Saldo Final</strong></td>
                  <td colSpan="2"><strong>${data.saldo.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  const handleAddCuenta = () => {
    if (monto && tipo && cuenta) {
      const nuevaCuenta = { cuenta, monto: parseFloat(monto), tipo };
      if (tipo === "Debe") {
        setCuentasDebe([...cuentasDebe, nuevaCuenta]);
      } else {
        setCuentasHaber([...cuentasHaber, nuevaCuenta]);
      }
  
      // Restablece los campos después de agregar la cuenta
      setCuenta("");
      setMonto("");
      setTipo("");
    } else {
      console.log("Debe ingresar todos los datos para agregar una cuenta.");
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

  if (loading) return <p>Cargando cuentas...</p>;
  if (error) return <p>Error: {error}</p>;

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
              {cuentas.map((cuenta) => (
                <option key={cuenta.nombre} value={cuenta.nombre}>
                  {cuenta.nombre}
                </option>
              ))}
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

        <div className="asientos-contables__botones">
          <button
            onClick={() => setMostrarLibro("diario")}
            className={`asientos-contables__boton ${mostrarLibro === "diario" ? "activo" : ""}`}
          >
            Mostrar Libro Diario
          </button>
          <button
            onClick={() => setMostrarLibro("mayor")}
            className={`asientos-contables__boton ${mostrarLibro === "mayor" ? "activo" : ""}`}
          >
            Mostrar Libro Mayor
          </button>
        </div>

        {mostrarLibro === "diario" && (
  <div className="libro-diario">
    <h2>Libro Diario</h2>
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
          <React.Fragment key={index}>
            {asiento.debe.map((cuentaDebe, i) => (
              <tr key={`${index}-debe-${i}`}>
                {i === 0 && (
                  <>
                    <td rowSpan={asiento.debe.length + asiento.haber.length}>{asiento.fecha}</td>
                    <td rowSpan={asiento.debe.length + asiento.haber.length}>{asiento.descripcion}</td>
                  </>
                )}
                <td>{cuentaDebe.cuenta}</td>
                <td>${cuentaDebe.monto.toFixed(2)}</td>
                <td>Debe</td>
              </tr>
            ))}
            {asiento.haber.map((cuentaHaber, i) => (
              <tr key={`${index}-haber-${i}`}>
                <td>{cuentaHaber.cuenta}</td>
                <td>${cuentaHaber.monto.toFixed(2)}</td>
                <td>Haber</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)}

        {mostrarLibro === "mayor" && mostrarLibroMayor()}
      </div>
    </>
  );
};

export default AsientosContables;
