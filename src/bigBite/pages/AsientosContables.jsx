import '../css/asientosContables.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // Estado para almacenar las cuentas traídas del backend
    const [planDeCuentas, setPlanDeCuentas] = useState([]);
    
    // Estado para almacenar los asientos contables en el libro diario
    const [libroDiario, setLibroDiario] = useState([]);

    // Estado para mostrar el aviso de que se ingresó un nuevo asiento
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Función para obtener las cuentas desde el backend
    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const response = await fetch('http://localhost:8080/cuentas');
                const data = await response.json();
                setPlanDeCuentas(data);
            } catch (error) {
                console.error("Error al obtener las cuentas:", error);
            }
        };
        fetchCuentas();
    }, []);

    // Función para obtener los asientos desde el backend (ahora fuera de useEffect)
    const fetchAsientos = async () => {
        try {
            const response = await fetch('http://localhost:8080/asientos');
            const data = await response.json();
            setLibroDiario(data);
        } catch (error) {
            console.error("Error al obtener los asientos:", error);
        }
    };

    // Llamada inicial para obtener los asientos al cargar el componente
    useEffect(() => {
        fetchAsientos();
    }, []);

    const onSubmit = async (data) => {
        const cuentaSeleccionada = planDeCuentas.find(cuenta => cuenta.id === parseInt(data.cuenta, 10));

        if (!cuentaSeleccionada) {
            alert("Error: La cuenta seleccionada no es válida.");
            return;
        }

        const asientoData = {
            cuenta: cuentaSeleccionada.id, // Enviar el ID numérico de la cuenta
            monto: data.monto,
            tipo: data.tipo
        };

        try {
            // Enviar el asiento al backend
            const response = await fetch('http://localhost:8080/asientos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(asientoData),
            });

            if (response.ok) {
                // Mostrar el mensaje de éxito
                setShowSuccessMessage(true);

                // Volver a cargar los asientos desde el backend para actualizar la tabla
                fetchAsientos();

                // Ocultar el mensaje después de 3 segundos
                setTimeout(() => setShowSuccessMessage(false), 3000);

                reset();
            } else {
                alert("Error al guardar el asiento.");
            }
        } catch (error) {
            console.error("Error al guardar el asiento:", error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className="Asientos">
                <div className="titulo-asientos">
                    <h1 className='titulo-asiento'>Registrar asientos contables</h1>
                    <p>Complete los campos con la información necesaria</p>
                </div>
                <div className="formulario-asiento">
                    {/* Mostrar el mensaje de éxito */}
                    {showSuccessMessage && (
                        <div className="mensaje-exito">
                            ¡Asiento contable ingresado con éxito!
                        </div>
                    )}

                    <form className='formulario-contable' onSubmit={handleSubmit(onSubmit)}>
                        <div className="relleno">
                            <div>
                                <label>Cuenta:</label>
                                <select
                                    {...register("cuenta", { required: "Debe seleccionar una cuenta" })}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                    {planDeCuentas.map((cuenta) => (
                                        <option key={cuenta.id} value={cuenta.id}>
                                            {cuenta.codigo} - {cuenta.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.cuenta && <span className="error">{errors.cuenta.message}</span>}
                            </div>

                            <div>
                                <label>Monto:</label>
                                <input
                                    type="number"
                                    placeholder="Ingrese el monto del asiento"
                                    {...register("monto", { required: "El monto es obligatorio" })}
                                />
                                {errors.monto && <span className="error">{errors.monto.message}</span>}
                            </div>

                            {/* Selector para Debe o Haber */}
                            <div>
                                <label>Tipo:</label>
                                <select
                                    {...register("tipo", { required: "Debe seleccionar si es Debe o Haber" })}
                                >
                                    <option value="">Seleccione el tipo</option>
                                    <option value="debe">Debe</option>
                                    <option value="haber">Haber</option>
                                </select>
                                {errors.tipo && <span className="error">{errors.tipo.message}</span>}
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">Guardar Asiento</button>
                    </form>
                </div>

                {/* Mostrar tabla del libro diario */}
                <div className="libro-diario">
                    <h2>Libro Diario</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cuenta</th>
                                <th>Monto</th>
                                <th>Tipo</th> {/* Nuevo campo para Debe/Haber */}
                            </tr>
                        </thead>
                        <tbody>
                            {libroDiario.map((asiento, index) => (
                                <tr key={index}>
                                    <td>{asiento.fecha}</td>
                                    <td>{asiento.cuenta.codigo}</td>
                                    <td>{asiento.monto}</td>
                                    <td>{asiento.tipo}</td> {/* Mostrar Debe o Haber */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
