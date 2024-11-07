import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import { UserContext } from "../../../context/UserContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import CryptoModal from "../CryptoModal";

function CartTotal() {
    const { cart } = useContext(dataContext);
    const { user } = useContext(UserContext);
    const itemsEnCarrito = cart.reduce((acumulador, element) => acumulador + element.cantItems, 0);
    const [showCryptoModal, setShowCryptoModal] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const subtotal = Math.round(cart.reduce((acumulador, element) => acumulador + element.precioCombo * element.cantItems, 0));
    const envio = Math.round(subtotal - subtotal * 0.90);
    const total = Math.round(subtotal + envio);

    useEffect(() => {
        initMercadoPago("APP_USR-f181386b-0e32-4a84-9dfe-6cd67bd73f20", {
            locale: "es-AR",
        });
    }, []);

    const handleCheckout = () => {
        if (total > 0) {
            setShowForm(true);
        }
    };

    const handleCancelar = () => {
        setShowForm(false);
    };

    const crearPreferencia = async (orderInfo) => {
        try {
            const respuesta = await axios.post("https://bigbitebackend-diegocanaless-projects.vercel.app/create_preference", orderInfo);
            const { id } = respuesta.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const manejoCompra = async () => {
        if (!userName || !deliveryType || !paymentMethod || (deliveryType === "envio" && !userAddress)) {
            alert("Por favor, complete todos los campos requeridos antes de continuar.");
            return;
        }

        const orderInfo = {
            user: {
                id: user.id,
                name: userName,
                email: user.email,
            },
            carrito: cart,
            precioTotal: total,
            direccion: deliveryType === "envio" ? userAddress : "Retiro en local",
            estadoPedido: "en preparacion",
            metodoPago: paymentMethod,
        };

        console.log("Información del pedido:", orderInfo); // Console log para verificar la información

        const id = await crearPreferencia(orderInfo);
        if (id) {
            setPreferenceId(id);
        }
    };

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
                                await manejoCompra();
                            }}
                        >
                            MercadoPago
                        </button>
                        {preferenceId && (
                            <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: "smart_option" } }} />
                        )}
                    </div>

                    <div className="form-btns">
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