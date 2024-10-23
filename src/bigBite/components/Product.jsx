import React, { useContext, useState } from 'react';
import { dataContext } from './Context/DataContext';
import '../css/menu.css';
import ShoppingCart from '../assets/shopping-cart.png';

const Product = () => {
    const { data, agregarCarrito } = useContext(dataContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    return (
        <div className="product-grid">
            {data.map((product) => (
                <div className="product-card" key={product.id}>
                    <h3>{product.nombre}</h3>
                    <img 
                        src={product.urlImagen} 
                        alt={product.nombre} 
                        onClick={() => openModal(product)} 
                        style={{ cursor: 'pointer' }} 
                    />
                    <h3 className='precio-card'>${product.precio}</h3>
                    <button className="cart-button" onClick={() => agregarCarrito(product)}>
                        <img src={ShoppingCart} alt="Agregar al carrito" />
                    </button>
                </div>
            ))}

            {showModal && selectedProduct && (
                <div className="modal-menu">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>{selectedProduct.nombre}</h2>
                        <img src={selectedProduct.urlImagen} alt={selectedProduct.nombre} />
                        <p>Descripción: {selectedProduct.descripcion}</p>
                        <h3>Precio: ${selectedProduct.precio}</h3>
                    </div>
                    <div className="modal-overlay" onClick={closeModal}></div>
                </div>
            )}
        </div>
    );
};

export default Product;

