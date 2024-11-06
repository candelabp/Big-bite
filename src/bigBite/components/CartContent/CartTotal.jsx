import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import { UserContext } from "../Context/UserContext"; // Asegúrate de importar el UserContext
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

function CartTotal() {
    const { cart } = useContext(dataContext);
    const { user } = useContext(UserContext); // Accede al contexto del usuario
    const userEmail = user.email; // Obtiene el email del usuario activo

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

    const crearPreferencia = async () => {
        try {
            const respuesta = await axios.post("https://bigbitebackend-diegocanaless-projects.vercel.app/create_preference", {
                title: "Pedido Big Bite",
                cantidad: 1,
                price: total,
                descripcion: cart,
                email: userEmail, // Incluye el correo del usuario
                address: deliveryType === "envio" ? document.getElementById("address").value : "No especificada", // Dirección de envío si aplica
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
        <div>
            <h2>Total del Carrito: ${total}</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancelar Compra" : "Completar Compra"}
            </button>
            {showForm && (
                <div>
                    <label>
                        Tipo de Entrega:
                        <select onChange={(e) => setDeliveryType(e.target.value)}>
                            <option value="">Selecciona...</option>
                            <option value="retiro">Retiro en tienda</option>
                            <option value="envio">Envío a domicilio</option>
                        </select>
                    </label>
                    {deliveryType === "envio" && (
                        <div>
                            <label>
                                Dirección:
                                <input type="text" id="address" />
                            </label>
                        </div>
                    )}
                    <button onClick={manejoCompra}>Pagar</button>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}
                </div>
            )}
        </div>
    );
}

export default CartTotal;