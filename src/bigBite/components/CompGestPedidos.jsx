import React, { useState } from "react";
import ModalVerDetalles from "./ModalVerDetalles"; // Asegúrate de tener el componente ModalVerDetalles
import Swal from "sweetalert2"; // Para las notificaciones

export const CompGestPedidos = ({ pedido }) => {
    const [showDetails, setShowDetails] = useState(false); // Estado para mostrar los detalles del pedido
    const [status, setStatus] = useState(pedido.status); // Estado para mostrar el estado del pago

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus); // Cambia el estado del pedido
        // Aquí podrías hacer una llamada a la API para actualizar el estado en el backend si lo deseas
        Swal.fire({
            title: "Estado actualizado",
            text: `El estado del pedido ha sido actualizado a: ${newStatus}`,
            icon: "success",
        });
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails); // Muestra u oculta los detalles del pedido
    };

    return (
        <div className="divpedidos">
            <div className="info-pedidos">
                <div className="pedido-header">
                    <p><strong>Correo:</strong> {pedido.email}</p>
                    <p><strong>Dirección:</strong> {pedido.direccion}</p>
                    <p><strong>Total:</strong> ${pedido.total}</p>
                    <p><strong>Estado del pago:</strong> {status}</p>
                    <button onClick={toggleDetails}>
                        {showDetails ? "Ocultar detalles" : "Ver detalles"}
                    </button>
                </div>

                {/* Si el usuario quiere ver los detalles del pedido, mostrar la información del carrito */}
                {showDetails && (
                    <div className="pedido-detalles">
                        <h4>Detalles del carrito:</h4>
                        <ul>
                            {pedido.carrito.map((item, index) => (
                                <li key={index}>
                                    {item.title} - {item.cantItems} x ${item.unit_price}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleStatusChange("Entregado")}>Marcar como entregado</button>
                        <button onClick={() => handleStatusChange("Pendiente")}>Marcar como pendiente</button>
                        <button onClick={() => handleStatusChange("Cancelado")}>Marcar como cancelado</button>
                    </div>
                )}
            </div>

            {/* Modal para ver detalles adicionales del pedido */}
            <ModalVerDetalles pedido={pedido} />
        </div>
    );
};
