import { useContext, useState } from "react";
import { dataContext } from "../Context/DataContext";
import Product from "../Product";

function CartTotal() {

    const { cart } = useContext(dataContext);
  
    
    const [showForm, setShowForm] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const subtotal = Math.round(cart.reduce((acumulador, element) => acumulador + element.precioCombo * element.repeticion , 0));
    const envio = Math.round(subtotal - subtotal * 0.90);
    const total = Math.round(subtotal + envio);

    const handleCheckout = () => {
        if (total > 0) {
          setShowForm(true);
        }
      };
    const handleCancelar = () => {
       setShowForm(false);
      };

  return (
    <div className='productoscompra'>
        <hr className='lineagris' />
        <div className='section'>
            <p>Subtotal</p>
            <p>{'$'+subtotal}</p>
        </div>

        <div className='section'>
            <p>Envío</p>
            <p>{'$'+envio}</p>
        </div>

        <div className='section total'>
            <p>Total</p>
            <p>{'$'+total}</p>
            
        </div>

        <button type="button" className='btn btnpagar' onClick={handleCheckout} >Ir a pagar</button>

        {showForm && (
        <div className="payment-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label>Tipo de entrega</label>
            <button
              type="button"
              className={`btnes ${deliveryType === "envio" ? "active" : ""}`}
              onClick={() => setDeliveryType("envio")}
            >
              Envío
            </button>
            <button
              type="button"
              className={`btnes ${deliveryType === "local" ? "active" : ""}`}
              onClick={() => setDeliveryType("local")}
            >
              Retiro en el local
            </button>
          </div>

          {deliveryType === "envio" && (
            <div className="form-group">
              <label htmlFor="address">Dirección de envío</label>
              <input type="text" id="address" className="form-control" />
            </div>
          )}

          <div className="form-group">
            <label>Método de pago</label>
            {deliveryType !== "envio" && (
              <button
                type="button"
                className={`btnes ${
                  paymentMethod === "efectivo" ? "active" : ""
                }`}
                onClick={() => setPaymentMethod("efectivo")}
              >
                Efectivo
              </button>
            )}
            <button
              type="button"
              className={`btnes ${
                paymentMethod === "mercadopago" ? "active" : ""
              }`}
              onClick={() => setPaymentMethod("mercadopago")}
            >
              MercadoPago
            </button>
          </div>

          <div className="form-btns">  
          <button type="button" className="btnes btnpagar">
            Finalizar compra
          </button>
          <button type="button" className="btnes btnpagar" onClick={handleCancelar}>
            cancelar
          </button>
          </div>  
        </div>
      )}

    </div>
  )
}

export default CartTotal
