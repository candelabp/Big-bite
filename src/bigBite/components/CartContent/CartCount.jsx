import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../Context/DataContext'

const CartCount = ({ product }) => {

  const { agregarCarrito, cart, setCart } = useContext(dataContext);
 
  const decremento = () =>{
    const productRepeat = cart.find((element) => element.id === product.id)

    productRepeat.repeticion !== 1 && setCart(cart.map((element) => element.id === product.id ? {...product, repeticion: productRepeat.repeticion-1} : element))
  }
    
  return (
    <div className='divcantidad'>
        <button type="button" className='btn btn-outline-danger btncant' onClick={() => agregarCarrito(product)}>+</button>
        <p className='cantidadCarrito'>{product.repeticion}</p>
        <button type="button" className='btn btn-outline-danger btncant' onClick={decremento}>-</button>
    </div>
  )
}

export default CartCount
