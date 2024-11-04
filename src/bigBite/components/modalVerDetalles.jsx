import '../css/gestionPedidos.css';

const ModalVerDetalles = ({ pedido, onClose }) => {
    if (!pedido) return null;
  
    return (
        <>
            <div className="container-modal-detalles" id="modal-detalles">
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
                        <button className="button-modal cancel" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalVerDetalles;