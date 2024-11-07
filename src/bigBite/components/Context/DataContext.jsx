import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';


export const dataContext = createContext();

const DataProvider = ({ children }) => {

    const guardarCarrito = JSON.parse(localStorage.getItem("cart")) || []
    const[data, setData] = useState([]);
    const[cart, setCart] = useState(guardarCarrito);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    useEffect(() => {
        axios("http://localhost:8080/productos").then((respuesta) => setData(respuesta.data));
    }, []);

    const agregarCarrito = (product ) =>{
        const productRepeat = cart.find((element) => element.id === product.id)

        if (productRepeat){
            setCart(cart.map((element) => element.id === product.id ? {...product, cantItems: productRepeat.cantItems+1} : element))
        } else{
            setCart([...cart,product]);
            Swal.fire({
                position: "bottom-end",
                text: "Se agregó al carrito",
                showConfirmButton: false,
                width: "37vh",
                timer: 1500
            });
        }

    }

    return(
        <dataContext.Provider value={{ data, cart, setCart, agregarCarrito }}>
            {children}
        </dataContext.Provider>
    )
}

export default DataProvider;