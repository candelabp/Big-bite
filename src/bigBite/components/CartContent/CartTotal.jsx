import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import { UserContext } from "../../../context/UserContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import CryptoModal from "../CryptoModal";
import Swal from 'sweetalert2';
import { getEnvironments } from "../../../helpers/getEnvironments";

function CartTotal() {
    const { cart, resetCart } = useContext(dataContext);
    const { user } = useContext(UserContext);
    const itemsEnCarrito = cart.reduce((acumulador, element) => acumulador + element.cantItems, 0);
    const [showCryptoModal, setShowCryptoModal] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const {
        VITE_API_HOST
      } = getEnvironments();

    const subtotal = Math.round(cart.reduce((acumulador, element) => acumulador + element.precioCombo * element.cantItems, 0));
    const envio = Math.round(subtotal - subtotal * 0.90);
    const total = Math.round(subtotal + envio);

    initMercadoPago("APP_USR-f181386b-0e32-4a84-9dfe-6cd67bd73f20", {
        locale: "es-AR",
    });

    const handleCheckout = () => {
        if (total > 0) {
            setShowForm(true);
        }
    };

    const handleCancelar = () => {
        setShowForm(false);
    };

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference",{
                title: "Pedido Big Bite",
                quantity: 1,
                price: total,
            });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    const guardarDatosPedido = () => {
        const pedido = {
            title: "Big Bite",
            email: user.email,
            price: total,
            tipoEntrega: deliveryType === "envio" ? "Envío" : "Retiro en local",
            estadoPedido: "En Preparación",
            metodoPago: paymentMethod === "efectivo" ? "Efectivo" : 
                         paymentMethod === "mercadopago" ? "Plataformas de Pago Mercado Pago" : 
                         "Plataformas de Pago Binance",
            descripcion: cart
        };
        console.log("Datos del pedido:", pedido);
        registrarPedido(pedido);
        return pedido;
    };  

    const registrarPedido = async (pedido) => {
        try {
            const response = await fetch(`${VITE_API_HOST}/api/pedidos/registrar`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(pedido),
            });
      
            if (!response.ok) {
              // Manejar el error
              console.error('Error al registrar el pedido');
              return;
            }
      
            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
              data = await response.json();
            } else {
              data = await response.text();
            }
      
            console.log('Pedido registrado:', data);
            resetCart();
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
      };

    // Verificación para mostrar el botón de MercadoPago
    const isMercadoPagoButtonVisible =
        userName &&
        deliveryType &&
        (deliveryType === "local" || (deliveryType === "envio" && userAddress)) &&
        paymentMethod === "mercadopago"; 

    // Verificación para habilitar "Finalizar compra"
    const isFinalizarCompraEnabled =
        userName &&
        deliveryType &&
        paymentMethod &&
        (deliveryType === "local" || (deliveryType === "envio" && userAddress));

    return (
        <div className="productoscompra">
            <hr className="lineagris" />
            <div className="section">
                <p>Subtotal</p>
                <p>{'$' + subtotal}</p>
            </div>

            <div className="section">
                <p>Envío</p>
                <p>{'$' + envio}</p>
            </div>

            <div className="section total">
                <p>Total</p>
                <p>{'$' + total}</p>
            </div>

            <button type="button" className="btn btnpagar" onClick={handleCheckout}>Ir a pagar</button>

            {showForm && (
                <div className="payment-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
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
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Método de pago</label>
                        <button
                            type="button"
                            className={`btnes ${paymentMethod === "efectivo" ? "active" : ""}`}
                            onClick={() => setPaymentMethod("efectivo")}
                        >
                            Efectivo
                        </button>
                        <button
                            type="button"
                            className={`btnes ${paymentMethod === "cripto" ? "active" : ""}`}
                            onClick={() => {
                                setPaymentMethod("cripto");
                                setShowCryptoModal(true);
                            }}
                        >
                            Pagar con Cripto
                        </button>
                        <button
                            type="button"
                            className={`btnes ${paymentMethod === "mercadopago" ? "active" : ""}`}
                            onClick={async () => {
                                setPaymentMethod("mercadopago");
                                await handleBuy();
                                guardarDatosPedido();
                            }}
                        >
                            MercadoPago
                        </button>

                        {isMercadoPagoButtonVisible && preferenceId && (
                            <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: "smart_option" } }} />
                        )}
                    </div>

                    <div className="form-btns">
                        {paymentMethod !== "mercadopago" && (
                            <button
                                type="button"
                                className="btnes btnpagar"
                                onClick={guardarDatosPedido}
                                disabled={!isFinalizarCompraEnabled}  // Deshabilitar si no cumple con las condiciones
                            >
                                Finalizar compra
                            </button>
                        )}
                        <button type="button" className="btnes btnpagar" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {showCryptoModal && <CryptoModal totalPesos={total} onClose={() => setShowCryptoModal(false)} />}
        </div>
    );
}

export default CartTotal;