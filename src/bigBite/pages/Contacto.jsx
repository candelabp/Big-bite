import  { useState } from 'react';
import '../css/contacto.css';
import { Footer } from '../components/Footer';
import { NavBarBlanco } from '../components/NavBarBlanco';

export const Contacto = () => { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
     
        console.log({ name, email, message });
    };

    return (
        <>
    <NavBarBlanco></NavBarBlanco>
        <div className="contact-form-container">
            <h2>Contactanos</h2>
            <hr className="contact-line" />
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Nombre..." 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Correo</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Correo..." 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="message">Mensaje</label>
                    <textarea 
                        id="message" 
                        placeholder="Mensaje..." 
                        rows="5" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
        </div>
        <Footer></Footer>
        </>
    );
};