import { useState, useEffect } from 'react';
import axios from 'axios';
import burger from '../assets/burgerInicio.png';
import '../css/GestionPedidos.css';
import ModalVerDetalles from './modalVerDetalles';
import Swal from 'sweetalert2';

export const CompGestPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [estado, setEstado] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [buscarPedido, setBuscarPedido] = useState('');
    const [buscarPedidoEntregado, setBuscarPedidoEntregado] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/pedidos')
            .then((respuesta) => {
                const pedidosActivos = respuesta.data.filter(pedido => pedido.estadoPedido !== 'Entregado');
                const pedidosEntregados = respuesta.data.filter(pedido => pedido.estadoPedido === 'Entregado');

                setPedidos(pedidosActivos);
                setPedidosEntregados(pedidosEntregados);

                const estadoActual = {};
                respuesta.data.forEach((pedido) => {
                    estadoActual[pedido.id] = pedido.estadoPedido || 'En preparación';
                });
                setEstado(estadoActual);
            })
            .catch((error) => console.error('Error fetching pedidos:', error));
    }, []);

    const pedidosFiltrados = pedidos.filter(pedido =>
        pedido.id.toString().includes(buscarPedido) || pedido.email.includes(buscarPedido)
    );

    const pedidosEntregadosFiltrados = pedidosEntregados.filter(pedido =>
        pedido.id.toString().includes(buscarPedidoEntregado) || pedido.email.includes(buscarPedidoEntregado)
    );

    const mostrarPedidos = () => {
        if (buscarPedido && pedidosFiltrados.length > 0) {
            return pedidosFiltrados;
        } else if (buscarPedido && pedidosFiltrados.length === 0) {
            return [];
        }
        return pedidos;
    };

    const mostrarPedidosEntregados = () => {
        if (buscarPedidoEntregado && pedidosEntregadosFiltrados.length > 0) {
            return pedidosEntregadosFiltrados;
        } else if (buscarPedidoEntregado && pedidosEntregadosFiltrados.length === 0) {
            return [];
        }
        return pedidosEntregados;
    };

    const cambiarEstado = (id, nuevoEstado) => {
        setEstado((estadoAnterior) => ({
            ...estadoAnterior,
            [id]: nuevoEstado
        }));
    };

    const actualizarEstado = (id) => {
        axios.put(`http://localhost:8080/pedidos/editar/${id}`, { estadoPedido: estado[id] })
            .then(() => {
                Swal.fire({
                    text: "Se cambió correctamente el estado del pedido!",
                    icon: "success"
                });
                if (estado[id] === 'Entregado') {
                    moverPedidoAEntregados(id);
                }
            })
            .catch((error) => console.error('Error actualizando el pedido:', error));
    };

    const moverPedidoAEntregados = (id) => {
        const pedido = pedidos.find(pedido => pedido.id === id);
        if (pedido) {
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
            setPedidosEntregados([{ ...pedido, estadoPedido: 'Entregado' }, ...pedidosEntregados]);
        }
    };

    const openModal = (pedido) => {
        setIsModalOpen(true);
        setPedidoSeleccionado(pedido);
    };

    return (
        <>
            <div className='divpedidos'>
                <div className='paddingtitulos'>
                    <h1>Pedidos en curso</h1>
                    <p>Lista de todos los pedidos en curso</p>
                    <input
                        id='buscarPedido'
                        type="text"
                        placeholder='Buscar pedidos...'
                        className='buscar-pedidos'
                        value={buscarPedido}
                        onChange={(e) => setBuscarPedido(e.target.value)}
                    />
                </div>

                <div>
                    {mostrarPedidos().map((pedido) => (
                        <div key={pedido.id}>
                            <div className='info-pedidos'>
                                <div className='divpedidos' onClick={() => openModal(pedido)}>
                                    <img src={burger} className='burger' alt="burger icon" />
                                    <p className='nro-orden'>
                                        <b>Orden #{pedido.id}</b>
                                        <br />
                                        Total: ${pedido.subTotal}
                                    </p>
                                </div>
                                <div className='div-form'>
                                    <form onSubmit={(e) => { e.preventDefault(); actualizarEstado(pedido.id); }}>
                                        <select
                                            className='form-estado'
                                            value={estado[pedido.id]}
                                            onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                                        >
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

                <div className='paddingtitulos'>
                    <h1>Pedidos anteriores</h1>
                    <p>Lista de todos los pedidos entregados</p>
                    <input
                        id='buscarPedidoEntregado'
                        type="text"
                        placeholder='Buscar pedidos...'
                        className='buscar-pedidos'
                        value={buscarPedidoEntregado}
                        onChange={(e) => setBuscarPedidoEntregado(e.target.value)}
                    />
                </div>

                <div>
                    {mostrarPedidosEntregados().map((pedido) => (
                        <div key={pedido.id}>
                            <div className='info-pedidos' onClick={() => openModal(pedido)}>
                                <img src={burger} className='burger' alt="burger icon" />
                                <p className='nro-orden'>
                                    <b>Orden #{pedido.id}</b>
                                    <br />
                                    Total: ${pedido.subTotal}
                                </p>
                                <p className='estado-entregado'>Entregado</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && <ModalVerDetalles pedido={pedidoSeleccionado} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};
