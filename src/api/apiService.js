import axios from 'axios';
import { getAccessTokenSilently } from '@auth0/auth0-react';

const API_BASE_URL = 'http://localhost:8080/api'; // Cambia esto a la URL de tu backend

// Configura Axios para incluir el token de acceso en las solicitudes
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de acceso a cada solicitud
apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessTokenSilently();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Función para obtener la información del usuario
export const getUserInfo = async () => {
    try {
        const response = await apiClient.get('/user-info'); // Cambia esto a la URL correcta de tu backend
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

// Ejemplo de una función para obtener productos
// export const getProductos = async () => {
//     try {
//         const response = await apiClient.get('/productos');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching productos:', error);
//         throw error;
//     }
// };

