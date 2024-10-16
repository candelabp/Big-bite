import React, { useContext } from 'react'
import { dataContext } from './Context/DataContext'
import '../css/menu.css';
import ShopingCart from '../assets/shopping-cart.png';
import { div } from 'framer-motion/client';

const Product = () => {

    const { data, agregarCarrito } = useContext(dataContext);

    

    
  return (
    data.map((product) =>{
        return(
            <div className="product-card" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.img} alt={product.name} />
                <h3>${product.price}</h3>
                <button className="cart-button" onClick={() => agregarCarrito(product)}>
                    <img src={ShopingCart} alt="" /> 
                </button>
            </div>
        ) 
    })
  )
}

export default Product
