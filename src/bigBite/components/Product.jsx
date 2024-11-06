import React, { useContext, useState } from 'react';
import { dataContext } from './Context/DataContext';
import '../css/menu.css';
import ShoppingCart from '../assets/shopping-cart.png';

const Product = ({products}) => {
    const { agregarCarrito } = useContext(dataContext);
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
            {products.map((product) => (
                <div className="product-card" key={product.id} >
                    <div
                    onClick={() => openModal(product)}>
                    <h3>{product.nombre}</h3>
                    <img 
                        src={product.urlImagen} 
                        alt={product.nombre} 
                        style={{ cursor: 'pointer' }} 
                    />
                    <h3 className='precio-card'>${product.precioCombo}</h3>
                    </div>
                    <button className="cart-button" onClick={() => agregarCarrito(product)}>
                        <img src={ShoppingCart} alt="Agregar al carrito" />
                    </button>
                </div>
            ))}

        {showModal && selectedProduct && (
            <div className="modal-menu">
                <div className="modal-content">
                    <img src={selectedProduct.urlImagen} alt={selectedProduct.nombre} />
                    <div className="modal-text">
                        <h3>{selectedProduct.nombre}</h3>
                        <p> {selectedProduct.descripcion}</p>
                        <h4>Precio: ${selectedProduct.precioCombo}</h4>
                    </div>
                    <span className="close-button" onClick={closeModal}>&times;</span>
                </div>
                <div className="modal-overlay" onClick={closeModal}></div>
            </div>
        )}

        </div>
    );
};

export default Product;

