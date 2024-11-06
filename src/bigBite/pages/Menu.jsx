import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import '../css/menu.css';
import Product from '../components/Product';
import { dataContext } from '../components/Context/DataContext';
import { useContext, useState } from 'react';




export const Menu = () => {
    const { data } = useContext(dataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const pedidosDisp = data.filter(product => product.disponible == "true");

    const filteredProducts = searchTerm
    ? pedidosDisp.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pedidosDisp;

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
                            <input
                                className="menu-search"
                                type="search"
                                placeholder="Buscar en el menú..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="bi bi-search search-icon"></i>
                        </div>
                        <div className="menu-buttons">
                            <div id='order-button'>
                                {/* <button>Ordenar por:</button> */}
                            </div>
                        </div>
                    </div>

                    <div >
                        <Product products={filteredProducts}></Product>
                    </div>


                </div>


            </main>

            <Footer />
        </>
    )
}
