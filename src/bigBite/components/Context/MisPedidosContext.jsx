import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

// Crear el contexto
const misPedidosContext = createContext();

// Proveedor del contexto
export const MisPedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        //enviar mail despues del /email
        axios(`http://localhost:8080/pedidos/email/pepito@gmail.com`)
            .then((respuesta) => {
                console.log('Respuesta del backend:', respuesta.data); // Verifica la respuesta del backend
                setPedidos(respuesta.data);
            })
            .catch((error) => console.error('Error fetching pedidos:', error));
    }, []);

    return (
        <misPedidosContext.Provider value={{ pedidos }}>
            {children}
        </misPedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(misPedidosContext);
    if (!context) {
        throw new Error("usePedidos debe usarse dentro de un PedidosProvider");
    }
    return context;
};