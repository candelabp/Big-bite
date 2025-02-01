import { useEffect, useState } from 'react';
import burger from '../assets/burgerInicio.png';
import '../css/GestionPedidos.css';
import axios from 'axios';
import ModalVerDetalles from './modalVerDetalles';
import Swal from 'sweetalert2';
import { getEnvironments } from '../../helpers/getEnvironments';

export const CompGestPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [estado, setEstado] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(false);
    const [pedidoEntregadoSeleccionado, setPedidoEntregadoSeleccionado] = useState(false);
    const [buscarPedido, setBuscarPedido] = useState('');
    const [buscarPedidoEntregado, setBuscarPedidoEntregado] = useState('');

    const {
        VITE_API_HOST
    } = getEnvironments();

    useEffect(() => {
        axios(`${VITE_API_HOST}/api/pedidos`)
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
        pedido.id.toString().includes(buscarPedido) || pedido.email.includes(buscarPedido)
    );

    const pedidosEntregadosFiltrados = pedidosEntregados.filter(pedido =>
        pedido.id.toString().includes(buscarPedidoEntregado) || pedido.email.includes(buscarPedidoEntregado)
    );

    const mostrarPedidos = () => {
        if(buscarPedido && pedidosFiltrados && pedidosFiltrados.length > 0 ){
            return pedidosFiltrados;
        }else if(buscarPedido && (!pedidosFiltrados || pedidosFiltrados.length === 0)){
            return [];
        }
        return pedidos;
    };

    const mostrarPedidosEntregados = () => {
        if(buscarPedidoEntregado && pedidosEntregadosFiltrados && pedidosEntregadosFiltrados.length > 0 ){
            return pedidosEntregadosFiltrados;
        }else if(buscarPedidoEntregado && (!pedidosEntregadosFiltrados || pedidosEntregadosFiltrados.length === 0)){
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
        const nuevoEstado = estado[id];
        console.log(`${nuevoEstado}`);
        if (nuevoEstado) {
            axios.put(`${VITE_API_HOST}/api/pedidos/editar/${id}`, { estadoPedido: nuevoEstado })
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
        if (pedido) {
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
            setPedidosEntregados([{ ...pedido, estadoPedido: 'Entregado' }, ...pedidosEntregados]);
        }
    }

    const mostrarAlerta = () => {
        Swal.fire({
            text: "Se cambió correctamente el estado del pedido!",
            icon: "success"
        });
    };

    const openModal = (pedido, pedidoEntregado) => {
        setIsModalOpen(true);
        setPedidoSeleccionado(pedido);
        setPedidoEntregadoSeleccionado(pedidoEntregado);
    }

    return (
        <>
            <div className='divpedidos'>
                <div className='paddingtitulos'>
                    <h1>Pedidos en curso</h1>
                    <p>Lista de todos los pedidos en curso</p>
                    <input id='buscarPedido' type="text" placeholder='Buscar pedidos por id o mail...' className='buscar-pedidos' value={buscarPedido} onChange={(e) => setBuscarPedido(e.target.value)} />
                </div>

                <div>
                    {mostrarPedidos().map((pedido) => (
                        <div key={pedido.id}>
                            <div className='info-pedidos'>
                                <div className='divpedidos' onClick={() => openModal(pedido, null)}>
                                    <img src={burger} className='burger' alt="" />
                                    <p className='nro-orden'>
                                        <b>Orden #{pedido.id}</b>
                                        <br />
                                        Total: ${pedido.subTotal}
                                    </p>
                                </div>
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

            <div className='divpedidos div-entregados'>
                <div className='paddingtitulos'>
                    <h1>Pedidos anteriores</h1>
                    <p>Lista de todos los pedidos entregados</p>
                    <input id='buscarPedidoEntregado' type="text" placeholder='Buscar pedidos por id o mail...' className='buscar-pedidos' value={buscarPedidoEntregado} onChange={(e) => setBuscarPedidoEntregado(e.target.value)} />
                </div>
                <div>
                    {pedidosEntregados.length > 0 && (
                        mostrarPedidosEntregados().map((pedido) => (
                            <div key={pedido.id}>
                                <div className='info-pedidos' onClick={() => openModal(pedido, null)}>
                                    <img src={burger} className='burger' alt="" />
                                    <p className='nro-orden'>
                                        <b>Orden #{pedido.id}</b>
                                        <br />
                                        Total: ${pedido.subTotal}
                                    </p>
                                    <p className='estado-entregado'>Entregado</p>
                                </div>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Renderiza el modal sólo si isModalOpen es true */}
            {isModalOpen && <ModalVerDetalles pedido={pedidoSeleccionado || pedidoEntregadoSeleccionado} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};
