import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import React from 'react'
import { data } from "framer-motion/client";
import Product from "../Product";
import CartCount from "./CartCount";


const CartElements = () => {

    const {cart, setCart} = useContext(dataContext);

    const borrarProduct = (id) => {
        const buscarID = cart.find((element => element.id === id))

        const nuevoCarrito = cart.filter((element) => {
            return element !== buscarID
        })

        setCart(nuevoCarrito);
    }

    return cart.map((product) =>{
        return(
            <section className='sectionArticulo'>
                <div className='divimg'>
                    <img src={product.urlImagen} className='imgburger' alt="" />
                </div>
                <div className='divinfo'>
                    <p className="nombreArticuloCarrito">{product.nombre}<br />{'$'+product.precioCombo*product.repeticion}<br /></p>
                    <div className="contOpcionesCarrito">
                        <button type="button" className='btn eliminar' onClick={() => borrarProduct(product.id)}>Eliminar</button>
                    </div>
                </div>
                <CartCount product={product}></CartCount>
            </section>
        )
    })

}

export default CartElements
