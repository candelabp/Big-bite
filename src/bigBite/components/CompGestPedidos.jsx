import { useEffect, useState } from 'react';
import burger from '../assets/burgerInicio.png';
import '../css/gestionPedidos.css';
import axios from 'axios';
import ModalVerDetalles from './modalVerDetalles';
import Swal from 'sweetalert2';

export const CompGestPedidos = ({pedidosBuscados, pedidosEntregadosBuscados}) => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [estado, setEstado] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(false);
    const [pedidoEntregadoSeleccionado, setPedidoEntregadoSeleccionado] = useState(false);

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

    const mostrarPedidos = () => (pedidosBuscados && pedidosBuscados.length > 0 ? pedidosBuscados : pedidos);
    const mostrarPedidosEntregados = () => (pedidosEntregadosBuscados && pedidosEntregadosBuscados.length > 0 ? pedidosEntregadosBuscados : pedidosEntregados)

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
            setPedidosEntregados([ {...pedido, estadoPedido: 'Entregado'}, ...pedidosEntregados ]);
        }
    }

    const mostrarAlerta = () => {
        Swal.fire({
            // title: "!",
            text: "Se cambió correctamente el estado del pedido!",
            icon: "success"
        });
    };

    return (
        <>
            <div className='divpedidos'>
                <div className='paddingtitulos'>
                    <h1>Pedidos en curso</h1>
                    <p>Lista de todos los pedidos en curso</p>
                    <button onClick={() => setIsModalOpen(true)} disabled={!pedidoSeleccionado} type="button" className='btn btn-outline-warning botones'>Ver detalles</button>
                </div>

                <div>
                    {mostrarPedidos().map((pedido) => (
                        <div key={pedido.id}>
                            <div className='infopedidos' onClick={() => setPedidoSeleccionado(pedido)}>
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

            <div className='divpedidos div-entregados'>
                <div className='paddingtitulos'>
                    <h1>Pedidos anteriores</h1>
                    <p>Lista de todos los pedidos entregados</p>
                    <button onClick={() => setIsModalOpen(true)} disabled={!pedidoEntregadoSeleccionado} type="button" className='btn btn-outline-danger botones'>Ver detalles</button>

                </div>
                <div>
                    {pedidosEntregados.length > 0 && (
                        mostrarPedidosEntregados().map((pedido) => (
                        <div key={pedido.id}>
                            <div className='infopedidos' onClick={() => setPedidoEntregadoSeleccionado(pedido)}>
                                <img src={burger} className='burger' alt="" />
                                <p className='nrodeorden'>
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
