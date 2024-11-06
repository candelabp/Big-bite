import { useEffect, useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/GestionPedidos.css';

export const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Llamada inicial para obtener pedidos
        fetch('https://backbigbite.vercel.app/api/pedidos')
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

                <div className='pedidos-lista'>
                    {pedidos.map((pedido, index) => (
                        <div key={index} className='pedido'>
                            <h3>Pedido #{index + 1}</h3>
                            <p>ID de Pago: {pedido.paymentId}</p>
                            <p>Estado: {pedido.status}</p>
                            <p>Detalle: {pedido.descripcion}</p>
                            {/* Agrega otros datos que quieras mostrar */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};