

export const CarouselComponent = () => {
  return (
    <>

      <div id="carouselExampleSlidesOnly" className="carousel slider" data-bs-ride="carousel">
        <div className="carousel-inner d-block w-100">
          <div className="carousel-item active">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src="src\bigBite\assets\logo blanco.png" alt="" className="imgFondoSlider" />
              <img src="src\bigBite\assets\burger2.png" alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Mega Crunch Bate</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider">¡Voy por la mía!</button>
                <button className="btnRojoSlider">Ver el menú completo</button>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src="src\bigBite\assets\logo blanco.png" alt="" className="imgFondoSlider" />
              <img src="src\bigBite\assets\burger1.png" alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Mega Crunch Bate</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider">¡Voy por la mía!</button>
                <button className="btnRojoSlider">Ver el menú completo</button>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="slider">
              <h2 className="tituloSlider">Mas popular</h2>
              <img src="src\bigBite\assets\logo blanco.png" alt="" className="imgFondoSlider" />
              <img src="src\bigBite\assets\burger3.png" alt="" className="imgHamburguesaSlider" />
              <div className="descripcionPedido">
                <h4 className="tituloProdSlider">Smoky BBQ Bite</h4>
                <p className="textoSliderDescripcion">
                  Una hamburguesa con carne jugosa, lechuga fresca, tomate, pepinillos crujientes y una capa de cebolla
                  frita, todo bañado en una salsa especial de la casa
                </p>
                <button className="btnAmarilloSlider">¡Voy por la mía!</button>
                <button className="btnRojoSlider">Ver el menú completo</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>

  );
}
