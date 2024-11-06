import { useEffect, useState } from "react";
import axios from "axios";
import { CompGestPedidos } from "./CompGestPedidos";

const GestionPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const obtenerPedidos = async () => {
            const response = await axios.get("https://bigbitebackend-diegocanaless-projects.vercel.app/api/pedidos");
            setPedidos(response.data);
        };
        obtenerPedidos();
    }, []);

    return (
        <div>
            <h2>Gestión de Pedidos</h2>
            {pedidos.map(pedido => (
                <CompGestPedidos key={pedido.paymentId} pedido={pedido} />
            ))}
        </div>
    );
};

export default GestionPedidos;