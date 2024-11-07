import '../css/ingresar.css';
import { useContext, useState } from 'react';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavbarBlanco';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FirebaseApp } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore/lite';


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
        const db = getFirestore();
        e.preventDefault();
        try {
          // Buscar el usuario en Firestore por correo
          const q = query(collection(db, 'usuarios'), where('email', '==', email));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
    
            // Verificar la contraseña
            if (userData.password === password) {
              // Establecer el usuario en setUser
              const user = {
                uid: userDoc.id,
                ...userData
              };
              setUser(user);
    
              // Guardar los datos del usuario en localStorage
              localStorage.setItem('user', JSON.stringify(user));
    
              // Navegar a la página principal
              navigate('/');
            } else {
              alert('Contraseña incorrecta.');
            }
          } else {
            alert('No se encontró un usuario con ese correo.');
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('Hubo un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
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

                    <div className="btns">
                        <button type="submit" className="login-btn">Ingresar</button>
                        <button type="button" className='loginGoogle-btn' onClick={handleLoginWithGoogle}>Iniciar con <i className="bi bi-google"></i>oogle</button>
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