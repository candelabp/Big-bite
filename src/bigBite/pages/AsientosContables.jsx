import '../css/asientosContables.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useForm } from "react-hook-form";
import { useState } from 'react';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [tipoAsiento, setTipoAsiento] = useState(null);

    // Definir el plan de cuentas
    const planDeCuentas = [
        { codigo: '1.1.1.01', nombre: 'Caja en Efectivo' },
        { codigo: '1.1.1.02', nombre: 'Banco XX' },
        { codigo: '1.1.1.03', nombre: 'Mercado Pago' },
        { codigo: '1.1.1.04', nombre:'Binance'},
        { codigo: '1.1.3.01', nombre: 'Materias Primas' },
        { codigo: '2.1.1.01', nombre: 'Proveedores de Insumos' },
        { codigo: '2.1.2.01', nombre: 'IVA por Pagar' },
        { codigo: '4.1.1.01', nombre: 'Ventas de Hamburguesas' },
        { codigo: '4.1.1.02', nombre: 'Ventas de Bebidas' },
    ];

    const onSubmit = (data) => {
        if (!tipoAsiento) {
            alert("Por favor, seleccione el tipo de asiento.");
            return;
        }
        const asientoData = { ...data, tipoAsiento };
        console.log(asientoData);
        reset();
        setTipoAsiento(null);
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
            </div>
        </>
    );
};
