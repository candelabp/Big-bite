import logoBlanco from '../assets/logo blanco.png';
import burger2 from '../assets/burger2.png';
import burger1 from '../assets/burger1.png';
import burger3 from '../assets/burger3.png';
import { useNavigate } from 'react-router-dom';
export const CarouselComponent = () => {
  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    navigate('/menu');
  };

  return (
    <>

      <div id="carouselExampleSlidesOnly" className="carousel slider" data-bs-ride="carousel">
        <div className="carousel-inner d-block w-100">
          <div className="carousel-item active">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src={logoBlanco} alt="" className="imgFondoSlider" />
              <img src={burger2} alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Mega Crunch Bite</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider" onClick={handleNavigateToMenu}>¡Ver el menú completo!</button>
                {/* <button className="btnRojoSlider">Ver el menú completo</button> */}
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src={logoBlanco} alt="" className="imgFondoSlider" />
              <img src={burger1} alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Mega Crunch Bate</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider" onClick={handleNavigateToMenu}>¡Ver el menú completo!</button>
                {/* <button className="btnRojoSlider">Ver el menú completo</button> */}
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src={logoBlanco} alt="" className="imgFondoSlider" />
              <img src={burger3} alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Smoky BBQ Bite</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider" onClick={handleNavigateToMenu}>¡Ver el menú completo!</button>
                {/* <button className="btnRojoSlider">Ver el menú completo</button> */}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>

  );
}
