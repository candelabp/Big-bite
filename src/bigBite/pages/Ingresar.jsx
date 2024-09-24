import '../css/ingresar.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Ingresar = () => {
    return (
        <>
            <NavBarBlanco />
            <div className='form-container'>
            <form className="inicio-sesion">
                <label htmlFor="email"><b>Email</b></label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password"><b>Contraseña</b></label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="recordar">
                    <b>Recordar contraseña</b>
                    <input type="checkbox" id="recordar" name="recordar" />
                </label>

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
