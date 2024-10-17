import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa React Router DOM
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/src/carousel';
import './styles.css';
import './normalize.css';
import DataProvider from './bigBite/components/Context/DataContext';

// Importa las páginas
import { Home } from './bigBite/pages/Home';
import { Formulario } from './bigBite/pages/Formulario';
import { Login } from './bigBite/pages/Login';
import { Ingresar } from './bigBite/pages/Ingresar';
import {Menu} from './bigBite/pages/Menu';
import { Carrito } from './bigBite/pages/Carrito';
import { Contacto } from './bigBite/pages/Contacto';
import { AdminPpal } from './bigBite/pages/AdminPpal';
import { AdminProductos } from './bigBite/pages/AdminProductos';
import { AdminBebidas } from './bigBite/pages/AdminBebidas';
import { AdminPapas } from './bigBite/pages/AdminPapas';
import { AsientosContables } from './bigBite/pages/AsientosContables';
import { GestionPedidos } from './bigBite/pages/GestionPedidos';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <DataProvider>
  <React.StrictMode>
    <Router> {/* Configura Router */}
      <Routes> {/* Define las rutas */}
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/AdminProductos" element={<AdminProductos />} />
        <Route path="/AdminBebidas" element={<AdminBebidas />} />
        <Route path="/AdminPapas" element={<AdminPapas />} />
        <Route path="/AdminPpal" element={<AdminPpal />} />
        <Route path="/AsientosContables" element={<AsientosContables />} />
        <Route path="/GestionPedidos" element={<GestionPedidos />} />

      </Routes>
    </Router>
  </React.StrictMode>
  </DataProvider>  
);