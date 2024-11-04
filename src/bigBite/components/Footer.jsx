import logoBlancoFooter from '../assets/logo_blanco_footer.png'
import { Link } from 'react-router-dom';
import '../css/footer.css';

export const Footer = () => {
    return (
        <>
           <footer>
                <div className='footer-logo'>
                    <img src={logoBlancoFooter} alt="Big Bite Logo" />
                </div>

                <div>
                    <Link className='footer-links' to='/'>Inicio</Link>
                    <Link className='footer-links' to=''>Servicios</Link>
                    <Link className='footer-links' to=''>Terminos</Link>
                    <Link className='footer-links' to='/AdminPpal'>Politicas</Link>
                </div>

                <div>
                    <Link to='https://www.instagram.com/?hl=es' target='_blank'><i className="bi bi-instagram footer-redes"></i></Link>
                    <Link to='https://facebook.com/?locale=es_LA' target='_blank'><i className="bi bi-facebook footer-redes"></i></Link>
                    <Link to='https://x.com/?lang=es' target='_blank'><i className="bi bi-twitter-x footer-redes"></i></Link>
                </div>

                <hr className='footer-linea' />

                <div className='footer-bottom'>
                    <p>© 2024 Big Bite Corporation.</p>
                    <p> Todos los derechos reservados.</p>
                </div>
                </footer>

        </>
    )
}