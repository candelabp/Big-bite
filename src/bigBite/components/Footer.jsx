import '../css/footer.css';
import logoBlanco from '../assets/logo blanco.png'
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <>

            <footer>
                <div className="footer-container">
                    <div className="footer-links">
                        <a href="#">Términos de Servicio</a>
                        <a href="#">Políticas de Privacidad</a>
                    </div>
                    <div className="footer-link-social">
                        <div className="footer-link2">
                            <a href="#">Preguntas Frecuentes</a>
                        </div>
                        <div className="footer-link2">
                        <Link className="tituloLinkRojo" to="/AdminPpal">Administrador</Link>
                        </div>
                        <div className="footer-social">

                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-facebook"></i></a>
                        </div>
                    </div>

                </div>

                <div className="footer-logo">
                    <img src={logoBlanco}  alt="Big Bite Logo" />
                </div>

                <hr className="footer-linea" />

                <div className="footer-bottom">
                    <p>© 2024 Big Bite Corporation.</p>
                    <p> Todos los derechos reservados.</p>
                </div>
                <div className="footer-logo">
                    <img src={logoBlanco} alt="Big Bite Logo" />
                </div>
            </footer>


        </>
    )
}
