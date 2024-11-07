import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBarRojo";
import CartElements from '../components/CartContent/CartElements';
import '../css/carrito.css'
import CartTotal from '../components/CartContent/CartTotal';


export const Carrito = () => {

    return (
        <>
            <NavBar/>
            <div className='contenedor'>
                <br />
                <h3 className='resumencompra'>Resumen de compra</h3>
                <div className='contenedorLineaAmarilla'>
                    <hr className='linea'/>
                </div>
                <div className='division'>
                    <div className='division2'>
                        <CartElements></CartElements>
                    </div>
                    <CartTotal></CartTotal>
                </div>
            </div>
            <Footer/>
        </>
    )
}

