import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import Product from "../Product";

function CartTotal() {

    const { cart } = useContext(dataContext);

    const total = cart.reduce((acumulador, element) => acumulador + element.price * element.cantidad, 0)


  return (
    <div className='productoscompra'>
        <hr className='lineagris' />
        <div className='section'>
            <p>Subtotal</p>
            <p>{'$'+total}</p>
        </div>

        <div className='section'>
            <p>Envío</p>
            <p>$0</p>
        </div>

        <div className='section total'>
            <p>Total</p>
            <p>{'$'+total}</p>
        </div>

        <button type="button" className='btn btnpagar'>Ir a pagar</button>
    </div>
  )
}

export default CartTotal
