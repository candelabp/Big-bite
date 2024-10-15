import '../css/ingresar.css';
import { useContext, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseApp } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../api/userContext';


export const Ingresar = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext); 
    const navigate = useNavigate();

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



    const handleLogin = async () => {
        const auth = getAuth(FirebaseApp);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // El usuario ha iniciado sesión con éxito
            console.log('User Info:', result.user);
            setUser(result.user); 
            navigate('/')
        } catch (error) {
            console.error('Error during sign-in:', error);
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
                        <button type="button" className='loginGoogle-btn' onClick={handleLogin}>Iniciar con <i className="bi bi-google"></i>oogle</button>
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