import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { NavBarBlanco } from '../components/NavBarBlanco';
import '../css/menu.css';
import { NavbarBlanco } from '../components/NavbarBlanco';

// Importa las imágenes
import imageDoubleCheddarSmash from '../assets/double_cheddar_smash.png';
import imageCheesyDeluxeBite from '../assets/cheesy_deluxe_bite.png';
import imageSmokyBBQBite from '../assets/smoky_bbq_bite.png';
import imageMegaCrunchBite from '../assets/mega_crunch_bite.png';
import imageTripleThunderBite from '../assets/triple_thunder_bite.png';
import imageSimpleCheesyBite from '../assets/simple_cheesy_bite.png';
import imageLittleBiteBox from '../assets/little_bite_box.png';
import imagePapasBite from '../assets/papas_bite.png';

// Define la lista de productos
const productos = [
  { nombre: 'Double Cheddar Smash', precio: 11300, imagen: imageDoubleCheddarSmash },
  { nombre: 'Cheesy Deluxe Bite', precio: 13500, imagen: imageCheesyDeluxeBite },
  { nombre: 'Smoky BBQ Bite', precio: 12800, imagen: imageSmokyBBQBite },
  { nombre: 'Mega Crunch Bite', precio: 10000, imagen: imageMegaCrunchBite },
  { nombre: 'Triple Thunder Bite', precio: 15000, imagen: imageTripleThunderBite },
  { nombre: 'Simple Cheesy Bite', precio: 9800, imagen: imageSimpleCheesyBite },
  { nombre: 'Little Bite Box', precio: 10000, imagen: imageLittleBiteBox },
  { nombre: 'Papas Bite', precio: 5000, imagen: imagePapasBite }
];
  

export const Menu = () => {


    return (
        <>
<<<<<<< HEAD
            {/* Navbar */}

            <NavbarBlanco />
=======
            <NavBarBlanco/>
>>>>>>> 355b8f6b2ca3cf37f91d746aaa2563a971846d26

            {/* Menu */}

            <main>


                <div className="menu">
                    <h2 className="menu-tittle">Menú</h2>
                    <hr className="menu-line" />

                    <div className="menu-top">
                        <div className="search-container">
                            <input className="menu-search" type="search" placeholder="Buscar en el menú..." />
                            <i className="bi bi-search search-icon"></i>
                        </div>
                        <div className="menu-buttons">
                            <button>Ordenar por:</button>
                            <div className="filter-container">
                                <button>Filtros <i className="bi bi-sliders"></i></button>
                                
                            </div>
                        </div>
                    </div>

<<<<<<< HEAD
                    <div className="product-grid">
                        <div className="product-card">
                            <h3>Double Cheddar Smash</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\double_cheddar_smash.png" alt="Double Cheddar Smash" />
                            </button>
                            <h3>$11.300</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Cheesy Deluxe Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\cheesy_deluxe_bite.png" alt="Cheesy Deluxe Bite" />
                            </button>
                            <h3>$13.500</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Smoky BBQ Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\smoky_bbq_bite.png" alt="Smoky BBQ Bite" />
                            </button>
                            <h3>$12.800</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Mega Crunch Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\mega_crunch_bite.png" alt="Mega Crunch Bite" />
                            </button>
                            <h3>$10.000</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Triple Thunder Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\triple_thunder_bite.png" alt="Triple Thunder Bite" />
                            </button>
                            <h3>$15.000</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Simple Cheesy Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\simple_cheesy_bite.png" alt="Simple Cheesy Bite" />
                            </button>
                            <h3>$9.800</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Little Bite Box</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\little_bite_box.png" alt="Little Bite Box" />
                            </button>
                            <h3>$10.000</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        <div className="product-card">
                            <h3>Papas Bite</h3>
                            <button className="product-image">
                                <img src="src\bigBite\assets\papas_bite.png" alt="Papas Bite" />
                            </button>
                            <h3>$5.000</h3>
                            <button className="cart-button">
                                <img src="src\bigBite\assets\shopping-cart.png" alt="Añadir al carrito" />
                            </button>
                        </div>

                        {/* Repite para todos los productos */}
                    </div>
=======
                        
>>>>>>> 355b8f6b2ca3cf37f91d746aaa2563a971846d26
                </div>
                <div className="product-grid">
                    {productos.map((producto, index) => <ProductCard nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen} />)}
                </div>

            </main>

            <Footer />
        </>
    )
}
