import '../css/ingresar.css';
import { useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Ingresar = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:8080/usuarios/iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                // Si el login es exitoso
                const message = await response.text();
                alert(message); // Aquí puedes redirigir a otra página o hacer lo que necesites.
            } else {
                // Si hay un error (por ejemplo, credenciales incorrectas)
                const error = await response.text();
                setErrorMessage(error);
            }
        } catch (error) {
            setErrorMessage(`Error de conexión con el servidor: ${error.message}`);
        }
    };

    return (
        <>
            <NavBarBlanco />

            <div className='form-container'>
                <form className="inicio-sesion" onSubmit={handleSubmit}>
                    <label htmlFor="email"><b>Email</b></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password"><b>Contraseña</b></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <div className="btns">
                        <button type="submit" className="login-btn">Ingresar</button>
                        <button 
                            className="register-btn" 
                            type="button" 
                            onClick={() => alert("Recuperar contraseña")}
                        >
                            Olvidé mi contraseña
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};