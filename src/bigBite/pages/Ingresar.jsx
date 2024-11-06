import '../css/ingresar.css';
import { useContext, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FirebaseApp } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export const Ingresar = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    
    const handleLoginWithGoogle = async () => {
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

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        const loginData = { email, password };
        const auth = getAuth(FirebaseApp);
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          const user = result.user;
        //   console.log('User Info:', user);
    
          setUser(user);
          navigate('/');
        } catch (error) {
          console.error('Error during login:', error);
          alert(error.message);
        }
      };
    return (
        <>
            <NavBarBlanco />

            <div className='form-container'>
                <form className="inicio-sesion" onSubmit={handleLoginWithEmail}>
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

                    <div className="div-btns">
                        <button type="submit" className="ingresar-btn">Ingresar</button>
                        <button type="button" className='loginGoogle-btn' onClick={handleLoginWithGoogle}>Iniciar con <i className="bi bi-google"></i>oogle</button>
                        <button 
                            className="cont-btn" 
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