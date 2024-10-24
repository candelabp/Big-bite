import '../css/asientosContables.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [planDeCuentas, setPlanDeCuentas] = useState([]);
    const [libroDiario, setLibroDiario] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const exportToExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Resumen Financiero');
    
        worksheet.columns = [
            { header: 'Fecha', key: 'fecha', width: 15 },
            { header: 'Cuenta', key: 'cuenta', width: 15 },
            { header: 'Monto', key: 'monto', width: 15 },
            { header: 'Tipo', key: 'tipo', width: 15 }
        ];
    
        libroDiario.forEach((item) => {
            worksheet.addRow({
                fecha: item.fecha,
                cuenta: item.cuenta.codigo,
                monto: item.monto,
                tipo: item.tipo
            });
        });
    
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'reporte_financiero.xlsx';
            link.click();
        }).catch((error) => {
            console.error("Error al exportar a Excel:", error);
        });
    };

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

    const fetchAsientos = async () => {
        try {
            const response = await fetch('http://localhost:8080/asientos');
            const data = await response.json();
            setLibroDiario(data);
        } catch (error) {
            console.error("Error al obtener los asientos:", error);
        }
    };

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
            cuenta: cuentaSeleccionada.id,
            monto: data.monto,
            tipo: data.tipo
        };

        try {
            const response = await fetch('http://localhost:8080/asientos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(asientoData),
            });

            if (response.ok) {
                setShowSuccessMessage(true);
                fetchAsientos();
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
                    {showSuccessMessage && (
                        <div className="mensaje-exito">
                            ¡Asiento contable ingresado con éxito!
                        </div>
                    )}

                    <form className='formulario-contable' onSubmit={handleSubmit(onSubmit)}>
                        <div className="relleno">
                            <div>
                                <label>Cuenta:</label>
                                <select {...register("cuenta", { required: "Debe seleccionar una cuenta" })}>
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
                                <input className='input-asiento' type="number" placeholder="Ingrese el monto del asiento" {...register("monto", { required: "El monto es obligatorio" })}/>
                                {errors.monto && <span className="error">{errors.monto.message}</span>}
                            </div>

                            <div>
                                <label>Tipo:</label>
                                <select {...register("tipo", { required: "Debe seleccionar si es Debe o Haber" })}>
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

                <div className="libro-diario">
                    <h2>Libro Diario</h2>
                    <button onClick={exportToExcel} className="btn-excel">Descargar reporte</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cuenta</th>
                                <th>Monto</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libroDiario.map((asiento, index) => (
                                <tr key={index}>
                                    <td>{asiento.fecha}</td>
                                    <td>{asiento.cuenta.codigo}</td>
                                    <td>{asiento.monto}</td>
                                    <td>{asiento.tipo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
