import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/gestionPedidos.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


export const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [buscarPedido, setBuscarPedido] = useState('');

    useEffect(() => {
        axios(`http://localhost:8080/pedidos`)
            .then((respuesta) => {
                const pedidos = respuesta.data.filter(pedido => pedido.estadoPedido !== 'Entregado');
                const pedidosEntregados = respuesta.data.filter(pedido => pedido.estadoPedido === 'Entregado');

                setPedidos(pedidos)
                setPedidosEntregados(pedidosEntregados)

                const estadoActual = {};
                respuesta.data.forEach((pedido) => {
                    estadoActual[pedido.id] = pedido.estadoPedido || 'En preparación';
                });
                setEstado(estadoActual);
                console.log('Estado inicial:', estadoActual); // Verifica el estado inicial
            })
            .catch((error) => console.error('Error fetching pedidos:', error));
    }, []);

    const pedidosFiltrados = pedidos.filter(pedido =>
        pedido.id.includes(buscarPedido) || pedido.email.includes(buscarPedido)
    );

    const pedidosEntregadosFiltrados = pedidosEntregados.filter(pedido =>
        pedido.id.includes(buscarPedido) || pedido.email.includes(buscarPedido)
    );

    return (
        <>
            <NavbarAdmin />
            <section className='contenedor'>
                <div className='divpedidos'>
                    <div>
                        <h1>Gestion de Pedidos</h1>
                        <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                    </div>
                    <div>
                        <input id='buscarPedido' type="text" placeholder='Buscar pedidos...' className='div-buscarpedidos' value={buscarPedido} onChange={(e) => setBuscarPedido(e.target.value)} />
                    </div>
                </div>

                <br />
                <hr />
                <br />

                {/* Pasar los pedidos filtrados al componente */}
                <CompGestPedidos pedidosBuscados={pedidosFiltrados} pedidosEntregadosBuscados={pedidosEntregadosFiltrados} />

            </section>
        </>
    )
}