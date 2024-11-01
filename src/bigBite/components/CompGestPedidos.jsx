import { useEffect, useState } from 'react';
import burger from '../assets/burgerInicio.png';
import '../css/gestionPedidos.css';
import axios from 'axios';

export const CompGestPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [estado, setEstado] = useState({});

    useEffect(() => {
        axios(`http://localhost:8080/pedidos`)
            .then((respuesta) => {
                console.log('Respuesta del backend:', respuesta.data); // Verifica la respuesta del backend
                setPedidos(respuesta.data);
                const estadoActual = {};
                respuesta.data.forEach((pedido) => {
                    // Usamos estadoPedido, que es el nombre correcto del campo en el backend
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
                })
                .catch((error) => console.error('Error actualizando el pedido:', error));
        } else {
            console.error('El nuevo estado es null o undefined');
        }
    };

    return (
        <>
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
                            <form onSubmit={(e) => { e.preventDefault(); actualizarEstado(pedido.id); }}>
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
                    <hr/>
                </div>
            ))}
        </>
    );
};
