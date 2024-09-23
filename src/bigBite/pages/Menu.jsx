import { useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco'
import '../css/menu.css';


export const Menu = () => {

     // Estado para manejar si el menú está abierto o cerrado
     const [menuAbierto, setMenuAbierto] = useState(false);

     // Función para abrir/cerrar el menú
     const abrirMenu = () => {
         setMenuAbierto(!menuAbierto); // Alterna entre abierto y cerrado
     };
 
     // Función para cerrar el menú (por ejemplo, al hacer clic en el botón de cerrar)
     const cerrarMenu = () => {
         setMenuAbierto(false);
     };
 

    return (
        <>
            <NavBarBlanco/>

            {/* Menu */}

            <main>


                <div className="menu">
                    <h2 className="menu-tittle">Menú</h2>
                    <hr className="menu-line"/>

                        <div className="menu-top">
                            <div className="search-container">
                                <input className="menu-search" type="search" placeholder="Buscar en el menú..."/>
                                    <i className="bi bi-search search-icon"></i>
                            </div>
                            <div className="menu-buttons">
                                <button>Ordenar por:</button>
                                <button>Filtros <i className="bi bi-sliders"></i></button>
                            </div>
                        </div>

                        <div className="product-grid">
                            <div className="product-card">
                                <h3>Double Cheddar Smash</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\double_cheddar_smash.png" alt="Double Cheddar Smash"/>
                                </button>
                                <h3>$11.300</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Cheesy Deluxe Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\cheesy_deluxe_bite.png" alt="Cheesy Deluxe Bite"/>
                                </button>
                                <h3>$13.500</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Smoky BBQ Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\smoky_bbq_bite.png" alt="Smoky BBQ Bite"/>
                                </button>
                                <h3>$12.800</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Mega Crunch Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\mega_crunch_bite.png" alt="Mega Crunch Bite"/>
                                </button>
                                <h3>$10.000</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Triple Thunder Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\triple_thunder_bite.png" alt="Triple Thunder Bite"/>
                                </button>
                                <h3>$15.000</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Simple Cheesy Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\simple_cheesy_bite.png" alt="Simple Cheesy Bite"/>
                                </button>
                                <h3>$9.800</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Little Bite Box</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\little_bite_box.png" alt="Little Bite Box"/>
                                </button>
                                <h3>$10.000</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            <div className="product-card">
                                <h3>Papas Bite</h3>
                                <button className="product-image">
                                    <img src="src\bigBite\assets\papas_bite.png" alt="Papas Bite"/>
                                </button>
                                <h3>$5.000</h3>
                                <button className="cart-button">
                                    <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito"/>
                                </button>
                            </div>

                            {/* Repite para todos los productos */}
                        </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
