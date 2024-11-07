import React, { useState, useEffect } from "react";
import '../css/asientosContables.css';
import NavbarAdmin from "../components/NavbarAdmin";
import LibroDiario from "../components/LibroDiario"; // Importa el componente
import LibroMayor from "../components/LibroMayor";
import { getEnvironments } from "../../helpers/getEnvironments";

export const AsientosContables = () => {
  const [cuenta, setCuenta] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [asientos, setAsientos] = useState([]); // Solo en estado, no en localStorage
  const [cuentasDebe, setCuentasDebe] = useState([]);
  const [cuentasHaber, setCuentasHaber] = useState([]);
  const [mostrarLibro, setMostrarLibro] = useState("diario");
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    VITE_API_HOST
  } = getEnvironments();

  // Efecto para cargar cuentas desde el servidor
  useEffect(() => {
    console.log("Datos de asientos:", asientos);
    const fetchCuentas = async () => {
      try {
        const response = await fetch(`${VITE_API_HOST}/api/cuentas`); // Asegúrate de que esta URL es correcta
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

    const fetchAsientos = async () => {
      try {
        const response = await fetch(`${VITE_API_HOST}/api/asientos`);
        if (!response.ok) throw new Error('Error al obtener los asientos');
        const data = await response.json();
        setAsientos(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCuentas();
    fetchAsientos();
  }, []);

  const handleAddCuenta = () => {
    if (monto && tipo && cuenta) {
      // Encuentra la cuenta correspondiente al nombre seleccionado
      const cuentaSeleccionada = cuentas.find(c => c.nombre === cuenta);
      if (cuentaSeleccionada) {
        const nuevaCuenta = {
          cuentaId: cuentaSeleccionada.id, // Asegúrate de que el campo del ID sea el correcto
          cuenta: cuentaSeleccionada.nombre,
          monto: parseFloat(monto),
          tipo
        };
        if (tipo === "Debe") {
          setCuentasDebe([...cuentasDebe, nuevaCuenta]);
        } else {
          setCuentasHaber([...cuentasHaber, nuevaCuenta]);
        }
  
        // Restablece los campos después de agregar la cuenta
        setCuenta("");
        setMonto("");
        setTipo("");
      }
    } else {
      console.log("Debe ingresar todos los datos para agregar una cuenta.");
    }
  };

  const handleGuardarAsiento = async () => {
    const nuevoAsiento = {
      fecha,
      descripcion,
      cuentaAsientoDTO: cuentasDebe.concat(cuentasHaber).map(cuenta => ({
        cuentaId: cuenta.cuentaId,
        monto: cuenta.monto,
        tipo: cuenta.tipo
      }))
    };
  
    try {
      const response = await fetch(`${VITE_API_HOST}/asientos/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAsiento)
      });
      if (!response.ok) throw new Error('Error al registrar el asiento');
  
      const updatedAsientos = [...asientos, nuevoAsiento];
      setAsientos(updatedAsientos);
      setCuentasDebe([]);
      setCuentasHaber([]);
      setDescripcion("");
    } catch (err) {
      console.error(err.message);
    }
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
          {/* Mostrar el Libro Diario con la lista de asientos */}
          <LibroDiario asientos={asientos} />
          <LibroMayor asientos={asientos}/>
      </div>
      
    </>
  );
};

export default AsientosContables;
