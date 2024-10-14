import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { NavBarBlanco } from '../components/NavBarBlanco';
import { productos } from '../helpers/products';
import '../css/menu.css';
import { useEffect, useState } from 'react';




export const Menu = () => {

    const [filter, setFilter] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productos);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);

    const handleFilterClick = (filterType) => {
        setFilter(filterType);
    };

    const toggleFilterMenu = () => {
        setFilterMenuVisible(!filterMenuVisible);
    };

    useEffect(() => {
        if (filter) {
            setFilteredProducts(productos.filter((producto) => producto.tipo === filter));
        } else {
            setFilteredProducts(productos);
        }
    }, [filter, productos]);




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
                                <button onClick={toggleFilterMenu} className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Filtros <i className="bi bi-sliders filter-button"></i></button>
                                <div className="dropdown-menu filter-menu">
                                    <li><a href="#" onClick={() => handleFilterClick('burger')}>Hamburguesa</a></li>
                                    <li><a href="#" onClick={() => handleFilterClick('bebida')}>Bebida</a></li>
                                    <li><a href="#" onClick={() => handleFilterClick('papas')}>Papas</a></li>
                                    <li><a href="#" onClick={() => handleFilterClick('cajita')}>Cajita</a></li>
                                </div>
                            </div>
                        </div>



                    </div>


                </div>
                <div className="product-grid">
                    {filteredProducts.map((producto, index) => (
                        <ProductCard
                            key={index}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            imagen={producto.imagen}
                        />
                    ))}
                </div>

            </main>

            <Footer />
        </>
    )
}
