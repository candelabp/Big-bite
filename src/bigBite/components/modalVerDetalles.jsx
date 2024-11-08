import '../css/gestionPedidos.css';

const ModalVerDetalles = ({ pedido, onClose }) => {
    if (!pedido) return null;

    return (
        <>
            <div className="container-modal-detalles" id="modalDetails">
                <div className="div-modal">
                    <div className="container-titulo-modal">
                        <h1>Detalles del pedido #{pedido.id}</h1>
                    </div>
                    <div className='div-detalles'>
                        <p><b>Número de orden:</b> {pedido.id}</p>
                        <p><b>Fecha del pedido:</b> {pedido.fechaSolicitado}</p>
                        <p><b>Total:</b> ${pedido.subTotal}</p>
                        <hr className="solid-divider" />
                        <h2>Productos:</h2>
                        {pedido.productos.map((producto, index) => (
                            <div key={index} className='producto-detalle'>
                                <p><b>Producto:</b> {producto.nombre}</p>
                                <p><b>Cantidad:</b> {producto.cantItems}</p>
                                <p><b>Precio:</b> ${producto.precioCombo}</p>
                                {index < pedido.productos.length - 1 && <hr className="dotted-divider" />}
                            </div>
                        ))}
                    </div>
                    <div className="container-buttons-modal-detalles">
                        <button className="button-modal cancel" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalVerDetalles;