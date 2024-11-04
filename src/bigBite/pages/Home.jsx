import { CarouselComponent } from "../components/CarouselComponent";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBarRojo";
import '../css/home.css';
import { motion } from "framer-motion";
import burgerInicio2 from '../assets/burguerInicio2.png';



export const Home = () => {
  return (
    <>
      {/* navbar */}
      <NavBar />

      <section className="content">
        {/* Animación del título principal */}
        <motion.h1
          className="tituloBlanco"
          initial={{ opacity: 0, y: -50 }} // Empieza desplazado hacia arriba e invisible
          animate={{ opacity: 1, y: 0 }}   // Aparece y se mueve a su posición original
          transition={{ duration: 1 }}     // Duración de 1 segundo
        >
          Gran <span className="separador">Sabor,</span>
          <motion.span
            className="tituloDestacado"
            initial={{ scale: 0 }}           // Empieza con tamaño 0
            animate={{ scale: 1 }}           // Crece hasta su tamaño original
            transition={{ duration: 0.8, delay: 1 }} // Inicia después de 1 segundo
          >
            Big Bite.
          </motion.span>
        </motion.h1>

        <div className="container-ppal">
          {/* Animación de la imagen */}
          
<motion.img
  className="imgPrincipal"
  src={burgerInicio2}
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
/>
        </div>

        {/* Animación del segundo título */}
        <motion.h1
          className="tituloAmarillo"
          initial={{ opacity: 0, scale: 0.8 }}  // Comienza con una escala pequeña
          animate={{ opacity: 1, scale: 1 }}    // Se expande a su tamaño original
          transition={{ duration: 1, delay: 0.5 }}  // Aparece después de 0.5 segundos
        >
          Big Bite.
        </motion.h1>
      </section>

      {/* carousel */}
      <CarouselComponent />

      {/* footer */}
      <Footer />
    </>
  );
};
