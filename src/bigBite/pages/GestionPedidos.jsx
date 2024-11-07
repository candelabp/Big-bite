import { useEffect, useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/GestionPedidos.css';
import io from 'socket.io-client';

const socket = io('https://bigbitebackend-diegocanaless-diegocanaless-projects.vercel.app');

export const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Llamada inicial para obtener pedidos
        fetch('https://bigbitebackend-diegocanaless-diegocanaless-projects.vercel.app/api/pedidos')
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Error al obtener pedidos:', error));

        // Escuchar nuevos pedidos
        socket.on('newOrder', (order) => {
            setPedidos((prevPedidos) => [...prevPedidos, order]);
        });

        return () => {
            socket.off('newOrder');
        };
    }, []);

    return (
        <>
            <NavbarAdmin />
            <section className='contenedor'>
                <div className='divInicio'>
                    <h1>Gestion de Pedidos</h1>
                    <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                </div>

                <br />
                <hr />
                <br />

                <div className='pedidos-lista'>
                    {pedidos.map((pedido) => (
                        <CompGestPedidos key={pedido.preferenceId} pedido={pedido} />
                    ))}
                </div>
            </section>
        </>
    );
};
