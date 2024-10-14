import '../css/menu.css';
import ShopingCart from '../assets/shopping-cart.png';

export const ProductCard = ({ nombre, precio, imagen }) => {
  console.log(nombre)
  console.log(precio)
  console.log()
  return (
    <div className="product-card">
      <h3>{nombre}</h3>
      <img src={imagen} alt={nombre} />
      <h3>${precio}</h3>
      <button className="cart-button">
      <img src={ShopingCart} alt="" /> 
      </button>
    </div>
  );
};
