import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import burger from '../assets/burgerInicio.png'
import '../css/misPedidos.css'
import { Footer } from '../components/Footer';
import { NavBar } from "../components/NavBarRojo";
import { usePedidos } from '../components/Context/MisPedidosContext';


// const pedidos = [
//     {
//       id: 1,
//       estado: "En preparación",
//       productos: [
//         { producto: "Hamburguesa clásica", cantidad: 2, precio: 500 },
//         { producto: "Papas fritas", cantidad: 1, precio: 200 }
//       ],
//       total: 1200,
//     },
//     {
//       id: 2,
//       estado: "Entregado",
//       productos: [
//         { producto: "Hamburguesa doble", cantidad: 1, precio: 800 },
//         { producto: "Bebida", cantidad: 2, precio: 150 }
//       ],
//       total: 1100,
//     },
//     {
//       id: 3,
//       estado: "En camino",
//       productos: [
//         { producto: "Hamburguesa vegetariana", cantidad: 1, precio: 600 },
//         { producto: "Batido", cantidad: 1, precio: 250 }
//       ],
//       total: 850,
//     },
//     {
//         id: 4,
//         estado: "Entregado",
//         productos: [
//           { producto: "BiteBox", cantidad: 1, precio: 1100 },
//           { producto: "Bebida", cantidad: 2, precio: 150 }
//         ],
//         total: 2100,
//       }
//   ];

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
                            </div>
                    )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}