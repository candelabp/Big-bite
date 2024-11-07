import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import { UserContext } from "../../../context/UserContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import CryptoModal from "../CryptoModal";

function CartTotal() {
    const { cart } = useContext(dataContext);
    const { user } = useContext(UserContext);
    const userEmail = user.email;
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);
    const [address, setAddress] = useState("");

    const subtotal = Math.round(cart.reduce((acum, el) => acum + el.precioCombo * el.cantItems, 0));
    const envio = Math.round(subtotal - subtotal * 0.90);
    const total = Math.round(subtotal + envio);

    useEffect(() => {
        initMercadoPago("APP_USR-f181386b-0e32-4a84-9dfe-6cd67bd73f20", { locale: "es-AR" });
    }, []);

    const crearPreferencia = async () => {
        try {
            const respuesta = await axios.post("https://bigbitebackend-diegocanaless-diegocanaless-projects.vercel.app/create_preference", {
                title: "Pedido Big Bite",
                cantidad: 1,
                price: total,
                descripcion: cart,
                userEmail,
                address,
            });
            const { id } = respuesta.data;
            return id;
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
        }
    };

    const manejoCompra = async () => {
        const id = await crearPreferencia();
        if (id) {
            setPreferenceId(id);
        }
    };

    const handleAddressChange = (e) => setAddress(e.target.value);

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

            <button type="button" className="btn btnpagar" onClick={() => setShowForm(true)}>Ir a pagar</button>

            {showForm && (
                <div className="payment-form">
                    <div className="form-group">
                        <label htmlFor="address">Dirección de envío</label>
                        <input type="text" id="address" className="form-control" value={address} onChange={handleAddressChange} />
                    </div>
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
            )}

            {/* Modal de Pago con Cripto */}
            {showCryptoModal && <CryptoModal totalPesos={total} onClose={() => setShowCryptoModal(false)} />}
        </div>
    );
}

export default CartTotal;
