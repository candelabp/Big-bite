import '../css/asientosContables.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useForm } from "react-hook-form";
import { useState } from 'react';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // Estado para almacenar los asientos contables en el libro diario
    const [libroDiario, setLibroDiario] = useState([]);

    // Estado para mostrar el aviso de que se ingresó un nuevo asiento
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Definir el plan de cuentas con su naturaleza (Débito/Crédito)
    const planDeCuentas = [
        { codigo: '1.1.1.01', nombre: 'Caja en Efectivo', naturaleza: 'Débito' },
        { codigo: '1.1.1.02', nombre: 'Cuentas Bancarias', naturaleza: 'Débito' },
        { codigo: '1.1.1.03', nombre: 'Plataformas de Pago', naturaleza: 'Débito' },
        { codigo: '1.1.3.01', nombre: 'Materias Primas', naturaleza: 'Débito' },
        { codigo: '1.1.3.02', nombre: 'Productos Terminados', naturaleza: 'Débito' },
        { codigo: '2.1.1.01', nombre: 'Proveedores de Insumos', naturaleza: 'Crédito' },
        { codigo: '2.1.2.01', nombre: 'IVA por Pagar', naturaleza: 'Crédito' },
        { codigo: '4.1.1.01', nombre: 'Ventas de Hamburguesas', naturaleza: 'Crédito' },
        { codigo: '4.1.1.02', nombre: 'Ventas de Bebidas', naturaleza: 'Crédito' },
        // Agrega más cuentas según sea necesario
    ];

    const onSubmit = (data) => {
        const cuentaSeleccionada = planDeCuentas.find(cuenta => cuenta.codigo === data.cuenta);
        const tipoAsiento = cuentaSeleccionada ? cuentaSeleccionada.naturaleza : null;

        if (!tipoAsiento) {
            alert("Error: No se pudo determinar el tipo de asiento.");
            return;
        }

        const asientoData = {
            ...data,
            tipoAsiento,
            fecha: new Date().toLocaleDateString() // Guarda la fecha actual
        };

        // Agrega el asiento al libro diario
        setLibroDiario([...libroDiario, asientoData]);

        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => setShowSuccessMessage(false), 3000);

        reset();
    };

    return (
        <>
            <NavbarAdmin />
            <div className="Asientos">
                <div className="titulo-asientos">
                    <h1>Registrar asientos contables</h1>
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
                                {/* Reemplazamos el input por un select */}
                                <select
                                    {...register("cuenta", { required: "Debe seleccionar una cuenta" })}
                                >
                                    <option value="">Seleccione una cuenta</option>
                                    {planDeCuentas.map((cuenta) => (
                                        <option key={cuenta.codigo} value={cuenta.codigo}>
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
                                <th>Tipo de Asiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libroDiario.map((asiento, index) => (
                                <tr key={index}>
                                    <td>{asiento.fecha}</td>
                                    <td>{asiento.cuenta}</td>
                                    <td>{asiento.monto}</td>
                                    <td>{asiento.tipoAsiento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
