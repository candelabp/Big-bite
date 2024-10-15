import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/src/carousel';
import './styles.css';
import './normalize.css';

// Importa las páginas
import { Home } from './bigBite/pages/Home';
import { Formulario } from './bigBite/pages/Formulario';
import { Login } from './bigBite/pages/Login';
import { Ingresar } from './bigBite/pages/Ingresar';
import { Menu } from './bigBite/pages/Menu';
import { Carrito } from './bigBite/pages/Carrito';
import { Contacto } from './bigBite/pages/Contacto';
import { FirebaseApp } from './firebase/config';
import { UserProvider } from './api/userContext';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);