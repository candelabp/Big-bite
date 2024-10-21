import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from './Context/DataContext';
import '../css/menu.css';
import ShoppingCart from '../assets/shopping-cart.png';

const Product = () => {
    const { data, agregarCarrito } = useContext(dataContext);
    // const { agregarCarrito } = useContext(dataContext);
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8080/productos');
    //             const products = await response.json();
    //             setData(products);
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

    return (
        <div className="product-list">
            {data.map((product) => (
                <div className="product-card" key={product.id}>
                    <h3>{product.nombre}</h3>
                    <img src={product.urlImagen} alt={product.nombre} />
                    <h3>${product.precio}</h3>
                    <button className="cart-button" onClick={() => agregarCarrito(product)}>
                        <img src={ShoppingCart} alt="Agregar al carrito" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Product;
