import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import burger from '../assets/burgerInicio.png'
import '../css/misPedidos.css'
import { Footer } from '../components/Footer';
import { NavBar } from "../components/NavBarRojo";
import { usePedidos } from '../components/Context/MisPedidosContext';
import { jsPDF } from 'jspdf';



export const MisPedidos = () => {

    const [selectedPedido, setSelectedPedido] = useState(null);
    const [selectedPedidoEntregado, setSelectedPedidoEntregado] = useState(null);
    const [isViewPedido, setIsViewPedido] = useState(false);
    const [isViewPedidoEntregado, setIsViewPedidoEntregado] = useState(false);
    const { pedidos } =usePedidos();
    

    const handleSelectPedido = (pedido) => {
        if (pedido.estadoPedido !== "Entregado") {
            setSelectedPedido(pedido);
            setSelectedPedidoEntregado(null);
            setIsViewPedido(false)
            setIsViewPedidoEntregado(false)
        }
    };

    const handleSelectPedidoEntregado = (pedido) => {
        if (pedido.estadoPedido === "Entregado") {
            setSelectedPedidoEntregado(pedido);
            setSelectedPedido(null);
            setIsViewPedido(false);
            setIsViewPedidoEntregado(false);
        }
    };

    // Mostrar detalles de pedido en curso
    const handleViewPedido = () => {
        setIsViewPedido(true);
    };

    // Mostrar detalles de pedido entregado
    const handleViewPedidoEntregado = () => {
        setIsViewPedidoEntregado(true);
    };

    const handleCerrarPedido = () => {
        setSelectedPedido(null);
        setSelectedPedidoEntregado(null);
        setIsViewPedido(false);
    };

    // Filtrar pedidos en curso y entregados
    const pedidosEnCurso = pedidos.filter(pedido => pedido.estadoPedido !== "Entregado");
    const pedidosEntregados = pedidos.filter(pedido => pedido.estadoPedido === "Entregado");
// Función para generar el PDF de la factura
const handleDescargarFactura = (pedido) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`Factura de Pedido #${pedido.id}`, 10, 20);

    doc.setFontSize(12);
    doc.text(`Fecha: ${pedido.fechaSolicitado}`, 10, 30);
    doc.text(`Hora: ${pedido.horaSolicitado}`, 10, 40);

    doc.text('Detalles del Pedido:', 10, 50);

    pedido.productos.forEach((producto, index) => {
        const yPosition = 60 + (index * 10);
        doc.text(`${producto.nombre} - Cantidad: ${producto.cantItems} - Precio: $${producto.precioCombo}`, 10, yPosition);
    });

    doc.text(`Total: $${pedido.subTotal}`, 10, 80 + (pedido.productos.length * 10));
    doc.save(`Factura_Pedido_${pedido.id}.pdf`);
};

    return (
        <>
         <NavBar />
            <section className='contenedor'>
                <div className='divpedidos arriba'>
                    <div className='arriba-izq'>
                        <h1>Mis Pedidos</h1>
                        <p>Mira el estado de tus pedidos</p>
                    </div>
                    {/* <div className='arriba_der'>
                        <button type="button" className='btn btn-outline-danger botonescolor'>Filtrar</button>
                    </div>                     */}
                </div>

                <br />
                <hr className='line'/>
                <br />

                {/* Sección Pedidos en curso */}
                <div className='divpedidos medio'>
                    <div className='paddingtitulos'>
                        <h1>Pedidos en curso</h1>
                        <p>Lista de todos los pedidos en curso</p>
                        {selectedPedido && (
                        <>
                            <button type="button" className='btn btn-outline-dark botones' onClick={handleViewPedido}>Ver detalles</button>
                        </>
                        )}
                    </div>
                    <div>
                        {pedidosEnCurso.map((pedido) => (
                            <div
                                key={pedido.id}
                                className={`infopedidos ${selectedPedido?.id === pedido.id ? 'pedido-seleccionado' : ''}`}
                                onClick={() => handleSelectPedido(pedido)}
                            >
                                <img src={burger} className='burger' alt=""/>
                                <p className='nrodeorden'>
                                <b>Orden #{pedido.id}</b>
                                    <br />
                                    <b>Total:</b> {pedido.subTotal}
                                    <br />
                                    <b>Fecha:</b> {pedido.fechaSolicitado}     <b>Hora:</b>{pedido.horaSolicitado}
                                    </p>
                                <p className='estado'>{pedido.estadoPedido}</p>
                            </div>
                        ))}
                        {isViewPedido && (
                        <div className='detalles-pedido'>
                            <h2 className='titulo-detalle'>Detalles del Pedido #{selectedPedido.id}</h2>
                            <ul className='lista-detalle'>
                                {selectedPedido.productos.map((producto, index) => (
                                    <li key={index}>
                                        {producto.nombre} - Cantidad: {producto.cantItems} - Precio: ${producto.precioCombo}
                                    </li>
                                ))}
                            </ul>
                            <p className='total-detalle'><b>Total:</b> ${selectedPedido.subTotal}
                            <br />
                            <b>Fecha:</b> {selectedPedido.fechaSolicitado}     <b>Hora:</b>{selectedPedido.horaSolicitado}
                            </p>
                            <button className='btn-factura' onClick={() => handleDescargarFactura(selectedPedido)}>
                                Descargar Factura
                            </button>
                        </div>
                    )}
                    </div>

                </div>

                {/* Sección Pedidos entregados */}
                <div className='divpedidos entregados'>
                    <div className='paddingtitulos'>
                        <h1>Pedidos anteriores</h1>
                        <p>Lista de todos los pedidos entregados</p>
                        {selectedPedidoEntregado && (
                        <>
                            <button type="button" className='btn btn-outline-dark botones' onClick={handleViewPedidoEntregado}>Revisar</button>
                        </>
                        )}
                    </div>
                    <div>
                        {pedidosEntregados.map((pedido) => (
                            <div
                                key={pedido.id}
                                className={`infopedidos ${selectedPedidoEntregado?.id === pedido.id ? 'pedido-seleccionado' : ''}`}
                                onClick={() => handleSelectPedidoEntregado(pedido)}
                            >
                                <img src={burger} className='burger' alt=""/>
                                <p className='nrodeorden'>
                                    <b>Orden #{pedido.id}</b>
                                    <br />
                                    <b>Total:</b> {pedido.subTotal}
                                    <br />
                                    <b>Fecha:</b> {pedido.fechaSolicitado}     <b>Hora:</b>{pedido.horaSolicitado}
                                </p>
                                <p className='estado'>{pedido.estadoPedido}</p>
                            </div>
                        ))}
                        {/* Renderizado condicional de detalles del pedido entregado */}
                    {isViewPedidoEntregado && (
                          <div className='detalles-pedido'>
                          <h2 className='titulo-detalle'>Detalles del Pedido #{selectedPedidoEntregado.id}</h2>
                          <ul className='lista-detalle'>
                              {selectedPedidoEntregado.productos.map((producto, index) => (
                                  <li key={index}>
                                      {producto.nombre} - Cantidad: {producto.cantItems} - Precio: ${producto.precioCombo}
                                  </li>
                              ))}
                          </ul>
                          <p className='total-detalle'><b>Total:</b> ${selectedPedidoEntregado.subTotal} 
                          <br />
                          <b>Fecha:</b> {selectedPedidoEntregado.fechaSolicitado}     <b>Hora:</b>{selectedPedidoEntregado.horaSolicitado}
                          </p>
                          <button className='btn-factura' onClick={() => handleDescargarFactura(selectedPedidoEntregado)}>
                                Descargar Factura
                            </button>

                            </div>
                    )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}