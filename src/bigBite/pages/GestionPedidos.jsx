import burger from '../assets/burgerInicio.png'
import '../css/gestionPedidos.css'
import NavbarAdmin from '../components/NavbarAdmin';
import {CompGestPedidos} from '../components/CompGestPedidos';
export const GestionPedidos = () => {
    return (
        <>
         <NavbarAdmin />
            <section className='contenedor'>
                <div className='divpedidos'>
                    <div>
                        <h1>Gestion de Pedidos</h1>
                        <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                    </div>
                    <div>
                        <input type="text" placeholder='Buscar pedidos...' className='buscarpedidos' />
                        {/* <br />
                        <button type="button" className='btn btn-outline-warning botonescolor'>Exportar pedidos</button>
                        <button type="button" className='btn btn-outline-danger botonescolor'>Filtrar</button> */}
                    </div>                    
                </div>
                <br />
                <hr className='line'/>
                <br />
                <div className='divpedidos'>
                    <div className='paddingtitulos'>
                        <h1>Pedidos en curso</h1>
                        <p>Lista de todos los pedidos en curso</p>
                        <button type="button" className='btn btn-outline-warning botones'>Ver detalles</button>
                        {/* <button type="button" className='btn btn-dark botones'>Actualizar estado</button> */}
                        
                    </div>
                    
                    <div>
                        <CompGestPedidos />
                        {/* <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #006</b>
                                <br />
                                Total: $30.000
                            </p>
                            <p className='estado'>En preparación</p>
                        </div>
                        <hr />
                        <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #005</b>
                                <br />
                                Total: $35.000
                            </p>
                            <p className='estado'>En preparación</p>
                        </div>
                        <hr />
                        <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #004</b>
                                <br />
                                Total: $20.000
                            </p>
                            <p className='estado'>En camino</p>
                        </div> */}
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className='divpedidos entregados'>
                    <div className='paddingtitulos'>
                        <h1>Pedidos anteriores</h1>
                        <p>Lista de todos los pedidos entregados</p>
                        <button type="button" className='btn btn-outline-danger botones'>Ver detalles</button>
                        {/* <button type="button" className='btn btn-dark botones'>Repetir pedido</button> */}
                    </div>
                    <div>
                        {/* <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #003</b>
                                <br />
                                Total: $32.800
                            </p>
                            <p className='estado'>Entregado</p>
                        </div>
                        <hr />
                        
                        <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #002</b>
                                <br />
                                Total:$ 25.000
                            </p>
                            <p className='estado'>Entregado</p>
                        </div>
                        <hr />
                        <div className='infopedidos'>
                            <img src={burger} className='burger' alt=""/>
                            <p className='nrodeorden'>
                                <b>Orden #001</b>
                                <br />
                                Total:$ 24.500
                            </p>
                            <p className='estado'>Entregado</p>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}