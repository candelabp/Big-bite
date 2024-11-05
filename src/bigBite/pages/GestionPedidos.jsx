import NavbarAdmin from '../components/NavbarAdmin';
import { CompGestPedidos } from '../components/CompGestPedidos';
import '../css/gestionPedidos.css';

export const GestionPedidos = () => {
    return (
        <>
            <NavbarAdmin />
            <section className='contenedor'>
                <div className='divInicio'>
                    <h1>Gestion de Pedidos</h1>
                    <p>Mira y actualiza el estado de los pedidos de hamburguesas</p>
                </div>

                <br />
                <hr />
                <br />

                <CompGestPedidos />
            </section>
        </>
    )
}