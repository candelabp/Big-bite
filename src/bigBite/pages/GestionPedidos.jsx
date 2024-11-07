import { useEffect, useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/GestionPedidos.css';

export const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Llamada inicial para obtener pedidos
        fetch('https://bigbitebackend-diegocanaless-diegocanaless-projects.vercel.app/api/pedidos')
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Error al obtener pedidos:', error));
    }, []);

    return (
        <>
            <NavbarAdmin />
            <section className='contenedor'>
                <div className='divInicio'>
                    <h1>GestiÃ³n de Pedidos</h1>
                    <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                </div>

                <br />
                <hr />
                <br />

                <div className='pedidos-lista'>
                    {pedidos.map((pedido) => (
                        <CompGestPedidos key={pedido.id} pedido={pedido} />
                    ))}
                </div>
            </section>
        </>
    );
};
