import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import CryptoModal from "../CryptoModal";

function CartTotal() {
    const { cart } = useContext(dataContext);
    const itemsEnCarrito = cart.reduce((acumulador, element) => acumulador + element.cantItems, 0);
    const [showCryptoModal, setShowCryptoModal] = useState(false);  // Estado para el modal de cripto

    const [showForm, setShowForm] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);

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

    const crearPreferencia = async () => {
        try {
            const respuesta = await axios.post("https://bigbitebackend-diegocanaless-diegocanaless-projects.vercel.app/create_preference", {
                title: "Pedido Big Bite",
                cantidad: 1,
                price: total,
                descripcion: cart,
            });

            const { id } = respuesta.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const manejoCompra = async () => {
        const id = await crearPreferencia();
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
                                className={`btnes ${paymentMethod === "efectivo" ? "active" : ""}`}
                                onClick={() => {
                                    setPaymentMethod("efectivo");
                                }}
                            >
                                Efectivo
                            </button>
                        )}
                           <button
                                type="button"
                                className={`btnes ${paymentMethod === "cripto" ? "active" : ""}`}
                                onClick={() => {
                                    setPaymentMethod("cripto");
                                    setShowCryptoModal(true);  // Abrir el modal de cripto
                                }}
                            >
                                Pagar con cripto
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
                        {paymentMethod !== "mercadopago" && (
                            <button type="button" className="btnes btnpagar">
                                Finalizar compra
                            </button>
                        )}
                        <button type="button" className="btnes btnpagar" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
            
            {/* Modal de Pago con Cripto */}
            {showCryptoModal && <CryptoModal totalPesos={total} onClose={() => setShowCryptoModal(false)} />}
        </div>
    );
}

export default CartTotal;