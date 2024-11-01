import axios from 'axios';
import { useEffect, useState } from 'react';

const ModalVerDetalles = ({ onClose }) => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEntregados, setPedidosEntregados] = useState([]);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const closeDetailsModal = () => setIsDetailsModalOpen(false);

    const openDetailsModal = () => setIsDetailsModalOpen(true);

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
            .catch((error) => {
                console.error('Error fetching pedidos:', error.message || error);
            });
    }, []);

    useEffect(() => {
        const cancelButton = document.getElementById("cancelButton");
        const acceptButton = document.getElementById("acceptButton");
        const cancelButtonDetails = document.getElementById("cancelButtonDetails");

        if (cancelButton) {
            cancelButton.addEventListener("click", closeModal);
        }

        if (acceptButton) {
            acceptButton.addEventListener("click", openDetailsModal);
        }

        if (cancelButtonDetails) {
            cancelButtonDetails.addEventListener("click", closeDetailsModal);
        }

        return () => {
            if (cancelButton) {
                cancelButton.removeEventListener("click", closeModal);
            }

            if (acceptButton) {
                acceptButton.removeEventListener("click", openDetailsModal);
            }

            if (cancelButtonDetails) {
                cancelButtonDetails.removeEventListener("click", closeDetailsModal);
            }
        };
    }, []);

    return (
        <>
            <div className="container-modal" id="modal">
                <div className="div-modal">
                    <div className="container-titulo-modal">
                        <h1>Ingrese el número de pedido para ver los detalles</h1>
                    </div>
                    <div className="container-input-modal">
                        <input placeholder="Número de orden" id="nroOrden" type="number" />
                    </div>
                    <div className="container-buttons-modal">
                        <button className="button-modal cancel" onClick={onClose}>Cancelar</button>
                        <button className="button-modal accept" onClick={openDetailsModal}>Aceptar</button>
                    </div>
                </div>
            </div>


            {isDetailsModalOpen && pedidos.map((pedido) => (
                <div key={pedido.id} className="container-modal-detalles" id="modalDetails">
                    <div className="div-modal">
                        <div className="container-titulo-modal">
                            <h1>Detalles del pedido #{pedido.id}</h1>
                        </div>
                        <div className='div-detalles'>
                            <p><b>Producto:</b> {pedido.producto}</p>
                            <p><b>Cantidad:</b> {pedido.cantidad}</p>
                            <p><b>Precio:</b> ${pedido.precio}</p>
                            <p><b>Total:</b> ${pedido.total}</p>
                        </div>
                        <div className="container-buttons-modal-detalles">
                            <button className="button-modal cancel" onClick={closeDetailsModal}>Cerrar</button>
                        </div>
                    </div>
                </div>
            ))}

            {/* {isModalOpen && (
                <div className="container-modal" id="modal">
                    <div className="div-modal">
                        <div className="container-titulo-modal">
                            <h1>Ingrese el número de pedido para ver los detalles</h1>
                        </div>
                        <div className="container-input-modal">
                            <input placeholder="Número de orden" value="0" id="nroOrden" type="number" />
                        </div>
                        <div className="container-buttons-modal">
                            <button className="button-modal cancel" id="cancelButton">Cancelar</button>
                            <button className="button-modal accept" id="acceptButton">Aceptar</button>
                        </div>
                    </div>
                </div>
            )}

            {isDetailsModalOpen && (
                <div className="container-modal-detalles" id="modalDetails">
                    <div className="div-modal">
                        <div className="container-titulo-modal">
                            <h1>Detalles del pedido</h1>
                        </div>
                        <div className='div-detalles'>
                            <p><b>Producto:</b> </p>
                            <p><b>Cantidad:</b> </p>
                            <p><b>Precio:</b> </p>
                            <p><b>Total:</b> </p>
                        </div>
                        <div className="container-buttons-modal-detalles">
                            <button className="button-modal cancel" id="cancelButtonDetails">Cerrar</button>
                        </div>
                    </div>
                </div>
            )} */}
            {/* <div className="container-modal" id="modal">
        <div className="div-modal">
            <div className="container-titulo-modal">
                <h1>Ingrese el número de pedido para ver los detalles</h1>
            </div>
            <div className="container-input-modal">
                <input placeholder="Número de orden" value="0" id="nroOrden" type="number" />
            </div>
            <div className="container-buttons-modal">
                <button class="button-modal cancel" id="cancelButton">Cancelar</button>
                <button className="button-modal accept" id="acceptButton">Aceptar</button>
            </div>
        </div>
    </div>

    <div className="container-modal-detalles" id="modal-detalles">
        <div className="div-modal">
            <div className="container-titulo-modal">
                <h1>Detalles del pedido</h1>
            </div>
            <div className='div-detalles'>
                <p><b>Producto:</b> </p>
                <p><b>Cantidad:</b> </p>
                <p><b>Precio:</b> </p>
                <p><b>Total:</b> </p>
            </div>
            <button className="button-modal cancel" id="cancelButton">Cerrar</button>
        </div>
    </div> */}
        </>
    );
};

export default ModalVerDetalles;