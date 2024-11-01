import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import '../css/asientosContables.css';

export const AsientosContables = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [planDeCuentas, setPlanDeCuentas] = useState([]);
    const [asientos, setAsientos] = useState([]);
    const [cuentasAsiento, setCuentasAsiento] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    const agregarCuentaAsiento = () => {
        setCuentasAsiento([...cuentasAsiento, { cuenta: '', monto: 0, tipo: '' }]);
    };

    const actualizarCuentaAsiento = (index, field, value) => {
        const nuevasCuentas = [...cuentasAsiento];
        nuevasCuentas[index][field] = value;
        setCuentasAsiento(nuevasCuentas);
    };

    const eliminarCuentaAsiento = (index) => {
        const nuevasCuentas = cuentasAsiento.filter((_, i) => i !== index);
        setCuentasAsiento(nuevasCuentas);
    };

    const onSubmit = async () => {
        const totalDebe = cuentasAsiento
            .filter(cuenta => cuenta.tipo === 'debe')
            .reduce((sum, cuenta) => sum + parseFloat(cuenta.monto), 0);

        const totalHaber = cuentasAsiento
            .filter(cuenta => cuenta.tipo === 'haber')
            .reduce((sum, cuenta) => sum + parseFloat(cuenta.monto), 0);

        if (totalDebe !== totalHaber) {
            alert("Los montos de 'Debe' y 'Haber' deben estar igualados.");
            return;
        }

        const data = {
            descripcion,
            cuentasAsiento
        };

        try {
            const response = await fetch('http://localhost:8080/asientos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
                reset();
                setCuentasAsiento([]);
                setDescripcion('');
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
                <h1>Registrar Asientos Contables</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                    {cuentasAsiento.map((cuenta, index) => (
                        <div key={index}>
                            <label>Cuenta:</label>
                            <select
                                value={cuenta.cuenta}
                                onChange={(e) => actualizarCuentaAsiento(index, 'cuenta', e.target.value)}
                            >
                                <option value="">Seleccione una cuenta</option>
                                {planDeCuentas.map((cuenta) => (
                                    <option key={cuenta.id} value={cuenta.id}>
                                        {cuenta.codigo} - {cuenta.nombre}
                                    </option>
                                ))}
                            </select>
                            <label>Monto:</label>
                            <input
                                type="number"
                                value={cuenta.monto}
                                onChange={(e) => actualizarCuentaAsiento(index, 'monto', e.target.value)}
                            />
                            <label>Tipo:</label>
                            <select
                                value={cuenta.tipo}
                                onChange={(e) => actualizarCuentaAsiento(index, 'tipo', e.target.value)}
                            >
                                <option value="">Seleccione el tipo</option>
                                <option value="debe">Debe</option>
                                <option value="haber">Haber</option>
                            </select>
                            <button type="button" onClick={() => eliminarCuentaAsiento(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={agregarCuentaAsiento}>Agregar Cuenta</button>
                    <button type="submit">Guardar Asiento</button>
                    {showSuccessMessage && <div>¡Asiento guardado exitosamente!</div>}
                </form>
            </div>
        </>
    );
};
