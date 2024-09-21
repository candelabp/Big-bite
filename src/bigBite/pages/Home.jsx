
import { CarouselComponent } from "../components/CarouselComponent"
import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"


export const Home = () => {
    return (
        <>

            {/* navbar */}

            <NavBar />

            <section className="content">

                <h1 className="tituloBlanco">Gran Sabor,<span className="tituloDestacado">Big Bite.</span></h1>

                <div className="container-ppal">
                    <img className="imgPrincipal" src="src\bigBite\assets\burguerInicio2.png" />
                </div>

                <h1 className="tituloAmarillo ">Big Bite.</h1>
            </section>

            {/* carousel  */}

            <CarouselComponent />

            {/* footer */}

            <Footer />
            
        </>
    )
}
