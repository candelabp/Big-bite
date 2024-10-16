import '../css/asientosContables.css';
import NavbarAdmin from '../components/NavbarAdmin';
import { useForm } from "react-hook-form";
import { useState } from 'react';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [tipoAsiento, setTipoAsiento] = useState(null);

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
                                <input
                                    placeholder="Ingrese el nombre de la cuenta"
                                    {...register("cuenta", { required: "El nombre de la cuenta es obligatorio" })}
                                />
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

                        <div className="tipo-asiento">
                            <label>Tipo de Asiento</label>
                            <div className="botones-tipo">
                                <button
                                    type="button"
                                    className={tipoAsiento === 'Débito' ? 'selected' : ''}
                                    onClick={() => setTipoAsiento('Débito')}
                                >
                                    Débito
                                </button>
                                <button
                                    type="button"
                                    className={tipoAsiento === 'Crédito' ? 'selected' : ''}
                                    onClick={() => setTipoAsiento('Crédito')}
                                >
                                    Crédito
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit">Guardar Asiento</button>
                    </form>
                </div>
            </div>
        </>
    );
};
