import axios from 'axios';
import { createContext, useState, useEffect, useContext} from 'react';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../../context/UserContext';
import { getEnvironments } from '../../../helpers/getEnvironments';




export const dataContext = createContext();

const DataProvider = ({ children }) => {

    const {
      VITE_API_HOST
    } = getEnvironments();

    const guardarCarrito = JSON.parse(localStorage.getItem("cart")) || []
    const[data, setData] = useState([]);
    const[cart, setCart] = useState(guardarCarrito);
    const { user } = useContext(UserContext) || {};

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    useEffect(() => {
        axios(`${VITE_API_HOST}/api/productos`).then((respuesta) => setData(respuesta.data));
    }, []);

    const agregarCarrito = (product ) =>{
        if (user) {
            const productRepeat = cart.find((element) => element.id === product.id);

            if (productRepeat) {
                setCart(cart.map((element) => 
                    element.id === product.id ? { ...product, cantItems: productRepeat.cantItems + 1 } : element
                ));
            } else {
                setCart([...cart, product]);
                console.log(product);
                Swal.fire({
                    position: "bottom-end",
                    text: "Se agregó al carrito",
                    showConfirmButton: false,
                    width: "37vh",
                    timer: 1500
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "inicia sesion para agregar cosas al carrito",
              });
        }
    ;}

    const resetCart = () => {
        setCart([]);
        Swal.fire({
            position: "bottom-end",
            text: "Compra realizada con éxito",
            showConfirmButton: false,
            width: "37vh",
            timer: 1500
        });
    };

    return(
        <dataContext.Provider value={{ data, cart, setCart, resetCart, agregarCarrito }}>
            {children}
        </dataContext.Provider>
    )
}

export default DataProvider;