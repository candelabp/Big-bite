import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { NavBarBlanco } from '../components/NavBarBlanco';
import '../css/menu.css';

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
            <NavBarBlanco />

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
                            <div id='order-button'>
                                <button>Ordenar por:</button>
                            </div>

                            <div className="filter-container">
                                <button>Filtros <i className="bi bi-sliders"></i></button>
                                <div id="filter-menu" class="filter-menu">
                                    <a href="#">Hamburguesa</a>
                                    <a href="#">Bebida</a>
                                    <a href="#">Papas</a>
                                    <a href="#">Cajita</a>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="product-grid">
                    {productos.map((producto, index) => <ProductCard nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen} />)}
                </div>

            </main>

            <Footer />
        </>
    )
}
