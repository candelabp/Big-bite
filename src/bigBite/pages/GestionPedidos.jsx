import { useEffect, useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/GestionPedidos.css';
import { getEnvironments } from '../../helpers/getEnvironments';

export const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    const {
        VITE_API_HOST
    } = getEnvironments();

    useEffect(() => {
        // Llamada inicial para obtener pedidos
        fetch(`${VITE_API_HOST}/api/pedidos`)
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Error al obtener pedidos:', error));
    }, []);

    return (
        <>
            <NavbarAdmin />
            <section className='contenedor'>
                <div className='divInicio'>
                    <h1>Gestión de Pedidos</h1>
                    <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                </div>

                <br />
                <hr />
                <br />

                <CompGestPedidos />

            </section>
        </>
    );
};