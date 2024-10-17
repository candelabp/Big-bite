import '../css/login.css';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';
import { motion } from 'framer-motion';

export const Login = () => {
  return (
    <>
      <NavBarBlanco />
      <div>
        <motion.div
          className="contenedor-mensaje"
          initial={{ opacity: 0, y: -20 }}  // Comienza invisible y desplazado hacia arriba
          animate={{ opacity: 1, y: 0 }}    // Aparece y se mueve a su posición original
          transition={{ duration: 0.5 }}      // La animación dura 1 segundo
        >
          <motion.p
            className="mensaje"
            initial={{ opacity: 0 }}  // El texto comienza invisible
            animate={{ opacity: 1 }}  // Aparece gradualmente
            transition={{ duration: 1 }}  // Aparece después de un pequeño retraso
          >
            <b>Ingresa tu correo electrónico si ya tienes cuenta. <br /> Si no, registrate acá.</b>
          </motion.p>

          {/* Animación de los botones */}
          <motion.div
            className="btns"
            initial={{ opacity: 0, scale: 0.8 }}  // Empieza invisible y con escala pequeña
            animate={{ opacity: 1, scale: 1 }}    // Se hace visible y crece a su tamaño original
            transition={{ duration: 0.4 }}  // Con un retraso de 1 segundo
          >
            <Link to="/ingresar">
              <motion.button
                className="login-btn"
                whileHover={{ scale: 1.1 }}  // Crece al pasar el cursor sobre el botón
                whileTap={{ scale: 0.9 }}    // Se reduce al hacer clic
              >
                <Link to="/ingresar" className='textLogin-btn'>Ingresar</Link>
              </motion.button>
            </Link>
            
            <Link to="/formulario">
              <motion.button
                className="register-btn"
                whileHover={{ scale: 1.1 }}  // Crece al pasar el cursor sobre el botón
                whileTap={{ scale: 0.9 }}    // Se reduce al hacer clic
              >
                <Link to="/formulario" className='textRegister-btn'>Registrarme</Link>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};