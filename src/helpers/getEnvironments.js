export const getEnvironments = () => {
    console.log(import.meta.env); // Agrega esta línea para verificar las variables de entorno
    return {
        ...import.meta.env
    };
};