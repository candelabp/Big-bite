import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';

// Crear el contexto
const misPedidosContext = createContext();

// Proveedor del contexto
export const MisPedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState([]);
    const { user } = useContext(UserContext); // Accede al contexto del usuario

    useEffect(() => {
        if (user) {
            const userEmail = user.email; // Obtiene el email del usuario activo
            // Enviar el email después del /email
            axios(`http://localhost:8080/pedidos/email/${userEmail}`)
                .then((respuesta) => {
                    console.log('Respuesta del backend:', respuesta.data); // Verifica la respuesta del backend
                    setPedidos(respuesta.data);
                })
                .catch((error) => console.error('Error fetching pedidos:', error));
        }
    }, [user]); // Dependencia en user para que se ejecute cada vez que cambie


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