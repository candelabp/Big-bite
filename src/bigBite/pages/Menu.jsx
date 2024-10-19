import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import '../css/menu.css';
import Product from '../components/Product';




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
                        </div>
                    </div>

                    <div className="product-grid">
                        <Product></Product>
                    </div>


                </div>


            </main>

            <Footer />
        </>
    )
}
