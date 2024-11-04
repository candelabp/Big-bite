import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const TotalCart = () => {


    const {cart} = useContext(dataContext);

    const itemsEnCarrito = cart.reduce((acumulador, element) => acumulador + element.cantItems, 0)


  return (
    <span className="contadorCarrito">{itemsEnCarrito}</span>
  )
}

export default TotalCart
