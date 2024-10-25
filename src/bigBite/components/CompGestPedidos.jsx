import { useEffect, useState } from 'react';
import burger from '../assets/burgerInicio.png';
import '../css/gestionPedidos.css';
import axios from 'axios';
import { p } from 'framer-motion/client';

export const CompGestPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [estado, setEstado] = useState({});

    useEffect(() => {
        axios(`http://localhost:8080/pedidos`)
            .then((respuesta) => {
                const pedidos = respuesta.data.filter(pedido => pedido.estadoPedido !== 'Entregado');
                const pedidosEntregados = respuesta.data.filter(pedido => pedido.estadoPedido === 'Entregado');

                setPedidos(pedidos)
                setPedidosEntregados(pedidosEntregados)

                // console.log('Respuesta del backend:', respuesta.data); // Verifica la respuesta del backend
                // setPedidos(respuesta.data);
                const estadoActual = {};
                respuesta.data.forEach((pedido) => {
                    estadoActual[pedido.id] = pedido.estadoPedido || 'En preparación';
                });
                setEstado(estadoActual);
                console.log('Estado inicial:', estadoActual); // Verifica el estado inicial
            })
            .catch((error) => console.error('Error fetching pedidos:', error));
    }, []);

    const cambiarEstado = (id, nuevoEstado) => {
        setEstado((estadoAnterior) => ({
            ...estadoAnterior,
            [id]: nuevoEstado
        }));
    };

    const actualizarEstado = (id) => {
        const nuevoEstado = estado[id];
        console.log(`${nuevoEstado}`);
        if (nuevoEstado) {
            axios.put(`http://localhost:8080/pedidos/editar/${id}`, { estadoPedido: nuevoEstado })
                .then(() => {
                    console.log(`Estado del pedido ${id} actualizado a ${nuevoEstado}`);
                    if (nuevoEstado === 'Entregado') {
                        moverPedidoAEntregados(id);
                    }
                })
                .catch((error) => console.error('Error actualizando el pedido:', error));
        } else {
            console.error('El nuevo estado es null o undefined');
        }
    };

    const moverPedidoAEntregados = (id) => {
        const pedido = pedidos.find(pedido => pedido.id === id);
        if(pedido){
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
            setPedidosEntregados([...pedidosEntregados, {...pedido, estadoPedido: 'Entregado'}])
        }
    }

    const mostrarAlerta = () => {
        alert("Se cambió correctamente el estado del pedido");
    };

    return (
        <>
            <div className='divpedidos'>
                <div className='paddingtitulos'>
                    <h1>Pedidos en curso</h1>
                    <p>Lista de todos los pedidos en curso</p>
                    <button type="button" className='btn btn-outline-warning botones'>Ver detalles</button>
                </div>

                <div>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id}>
                            <div className='infopedidos'>
                                <img src={burger} className='burger' alt="" />
                                <p className='nrodeorden'>
                                    <b>Orden #{pedido.id}</b>
                                    <br />
                                    Total: ${pedido.subTotal}
                                </p>
                                <div className='div-form'>
                                    <form onSubmit={(e) => { e.preventDefault(); actualizarEstado(pedido.id); mostrarAlerta(); }}>
                                        <select className='form-estado'
                                            value={estado[pedido.id] || 'En preparación'}
                                            onChange={(e) => cambiarEstado(pedido.id, e.target.value)}>
                                            <option value="En preparación">En preparación</option>
                                            <option value="En camino">En camino</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                        <br />
                                        <input type="submit" value='Enviar' className='enviar-estado' />
                                    </form>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}

                </div>
            </div>

            <br />
            <hr />
            <br />

            <div className='divpedidos entregados'>
                <div className='paddingtitulos'>
                    <h1>Pedidos anteriores</h1>
                    <p>Lista de todos los pedidos entregados</p>
                    <button type="button" className='btn btn-outline-danger botones'>Ver detalles</button>

                </div>
                <div>
                    {pedidosEntregados.length > 0 (
                        pedidosEntregados.map((pedido) => (
                        <div key={pedido.id}>
                            <div className='infopedidos'>
                                <img src={burger} className='burger' alt="" />
                                <p className='nrodeorden'>
                                    <b>Orden #{pedido.id}</b>
                                    <br />
                                    Total: ${pedido.subTotal}
                                </p>
                                <p className='estado'>Entregado</p>
                            </div>
                            <hr />
                        </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};
