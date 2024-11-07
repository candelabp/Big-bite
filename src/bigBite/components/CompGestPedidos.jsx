import { useState } from 'react';
import burger from '../assets/burgerInicio.png';
import '../css/GestionPedidos.css';
import axios from 'axios';
import ModalVerDetalles from './modalVerDetalles';
import Swal from 'sweetalert2';
import { getEnvironments } from '../../helpers/getEnvironments';

export const CompGestPedidos = ({ pedido }) => {
    const [estado, setEstado] = useState(pedido.status || 'En preparación');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        VITE_API_HOST
    } = getEnvironments();

    const cambiarEstado = (nuevoEstado) => {
        setEstado(nuevoEstado);
    };

    const actualizarEstado = () => {
        axios.put(`${VITE_API_HOST}/api/pedidos/editar/${pedido.preferenceId}`, { estadoPedido: estado })
            .then(() => {
                Swal.fire({
                    text: "Se cambió correctamente el estado del pedido!",
                    icon: "success"
                });
                if (estado === 'Entregado') {
                    // lógica para mover a pedidos entregados
                }
            })
            .catch((error) => console.error('Error actualizando el pedido:', error));
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className='divpedidos'>
            <div className='info-pedidos'>
                <div className='divpedidos' onClick={openModal}>
                    <img src={burger} className='burger' alt="" />
                    <p className='nro-orden'>
                        <b>Orden #{pedido.preferenceId}</b>
                        <br />
                        Total: ${pedido.total}
                        <br />
                        Correo: {pedido.userEmail}
                        <br />
                        Dirección: {pedido.address}
                    </p>
                </div>
                <div className='div-form'>
                    <form onSubmit={(e) => { e.preventDefault(); actualizarEstado(); }}>
                        <select
                            className='form-estado'
                            value={estado}
                            onChange={(e) => cambiarEstado(e.target.value)}
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

            {/* Renderiza el modal sólo si isModalOpen es true */}
            {isModalOpen && (
                <ModalVerDetalles pedido={pedido} onClose={() => setIsModalOpen(false)} />
            )}

            {/* Renderiza la lista del carrito */}
            <div className='carrito-lista'>
                <h3>Carrito:</h3>
                <ul>
                    {pedido.cart.map((item, index) => (
                        <li key={index}>
                            {item.title} - Cantidad: {item.quantity} - Precio: ${item.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
