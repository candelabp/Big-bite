import './Carrito.css'
import burger1 from '/img/burger1.png'
import burger2 from '/img/burger2.png'
import papasbite from '/img/papas_bite.png'
import './Carrito.css'


const Carrito = () => {

    return (
        <div className='container'>
            <br />
            <h3 className='resumencompra'>
                Resumen de compra
                <hr className='linea' />
            </h3>

            <section className='section1'>
                <div className='divcompra'>
                    <section className='section'>
                        <div className='divimg'>
                            <img src={burger1} className='imgburger' alt="" />
                        </div>
                        <div className='divinfo'>
                            <p>
                                Cheesy Deluxe Bite
                                <br />
                                (Acompañado de papas)
                                <br />
                                $13.500
                                <br />
                                <button type="button" className='btn eliminar'>
                                    Eliminar
                                </button>
                                <button type="button" className='btn editar'>
                                    Editar
                                </button>
                            </p>
                        </div>

                        <div className='divcantidad'>
                            <button type="button" className='btn btn-outline-danger btncant'>-</button>
                            <input type="text" value="1" className='inputcantidad' />
                            <button type="button" className='btn btn-outline-danger btncant'>+</button>
                        </div>
                    </section>

                    <br />

                    <section className='section'>
                        <div className='divimg'>
                            <img src={burger2} className='imgburger' alt="" />
                        </div>
                        <div className='divinfo'>
                            <p>
                                Mega Crunch Bite
                                <br />
                                (Acompañado de papas)
                                <br />
                                $10.000
                                <br />
                                <button type="button" className='btn eliminar'>
                                    Eliminar
                                </button>
                                <button type="button" className='btn editar'>
                                    Editar
                                </button>
                            </p>
                        </div>

                        <div className='divcantidad'>
                            <button type="button" className='btn btn-outline-danger btncant'>-</button>
                            <input type="text" value="1" className='inputcantidad' />
                            <button type="button" className='btn btn-outline-danger btncant'>+</button>
                        </div>
                    </section>

                    <br />

                    <section className='section'>
                        <div className='divimg'>
                            <img src={papasbite} className='imgburger' alt="" />
                        </div>
                        <div className='divinfo'>
                            <p>
                                Papas Bite
                                <br />
                                $5.000
                                <br />
                                <button type="button" className='btn eliminar'>
                                    Eliminar
                                </button>
                                <button type="button" className='btn editar'>
                                    Editar
                                </button>
                            </p>
                        </div>

                        <div className='divcantidad'>
                            <button type="button" className='btn btn-outline-danger btncant'>-</button>
                            <input type="text" value="1" className='inputcantidad' />
                            <button type="button" className='btn btn-outline-danger btncant'>+</button>
                        </div>
                    </section>

                </div>

                <div className='productoscompra'>
                    <hr className='lineagris' />
                    <div className='section'>
                        <p>Subtotal</p>
                        <p>$28.500</p>
                    </div>

                    <div className='section'>
                        <p>Envío</p>
                        <p>$1500</p>
                    </div>

                    <div className='section total'>
                        <p>Total</p>
                        <p>$30.000</p>
                    </div>

                    <button type="button" className='btn btn-danger btnpagar'>Ir a pagar</button>
                </div>
            </section>

        </div>
    )
}

export default Carrito