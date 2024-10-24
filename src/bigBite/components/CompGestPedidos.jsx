import { useEffect, useState } from 'react'
import burger from '../assets/burgerInicio.png'
import '../css/gestionPedidos.css'
import axios from 'axios';

export const CompGestPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [estado, setEstado] = useState({});

    useEffect(() => {
        axios(`http://localhost:8080/pedidos`)
            .then((respuesta) => {
                setPedidos(respuesta.data);
                const estadoActual = {};
                respuesta.data.forEach((pedido) => {
                    estadoActual[pedido.id] = pedido.estado;
                });
                setEstado(estadoActual);
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
        axios.put(`http://localhost:8080/pedidos/${pedido.id}`, { estado: nuevoEstado })
            .then(() => {
                console.log(`Estado del pedido ${id} actualizado a ${nuevoEstado}`);
            })
            .catch((error) => console.error('Error actualizando el pedido:', error));
    };

    return (
        <>
            <div className='infopedidos'>
                {pedidos.map((pedido) => (
                    <div key={pedido.id}>
                        <img src={burger} className='burger' alt="" />
                        <p className='nrodeorden'>
                            <b>Orden #{pedido.id}</b>
                            <br />
                            Total: ${pedido.subTotal}
                        </p>
                        <div className='div-form'>
                            <form onSubmit={(e) => { e.preventDefault; actualizarEstado(pedido.id); }}>
                                <select className='form-estado' value={estado[pedido.id] || 'En preparación'} onChange={(e) => cambiarEstado(pedido.id, e.target.value)}>
                                    <option value="En preparación">En preparación</option>
                                    <option value="En camino">En camino</option>
                                    <option value="Entregado">Entregado</option>
                                </select>
                            </form>
                            <input type="submit" value='Enviar' className='enviar-estado' />
                        </div>
                    </div>
                ))}
            </div>
            <hr />
        </>
    )
}