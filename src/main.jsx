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
import { Menu } from './bigBite/pages/Menu';
import { Carrito } from './bigBite/pages/Carrito';
import { Contacto } from './bigBite/pages/Contacto';
import { AdminPpal } from './bigBite/pages/AdminPpal';
import { AdminProductos } from './bigBite/pages/AdminProductos';
import { AdminBebidas } from './bigBite/pages/AdminBebidas';
import { AdminPapas } from './bigBite/pages/AdminPapas';
import { AdminBiteBox } from './bigBite/pages/AdminBiteBox';
import { AdminInsumos } from './bigBite/pages/AdminInsumos';
import { AsientosContables } from './bigBite/pages/AsientosContables';
import { GestionPedidos } from './bigBite/pages/GestionPedidos';
import { UserProvider } from './context/UserContext';
import { Administradores } from './bigBite/pages/Administradores';
import { MisPedidos } from './bigBite/pages/MisPedidos';
import { PerfilUsuario } from './bigBite/pages/PerfilUsuario'; 
import { MisPedidosProvider } from './bigBite/components/Context/MisPedidosContext';
import { ProtectedRoute } from './router/ProtectedRoute';
import { PublicRoute } from './router/PublicRouter';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(

  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        <Router> {/* Configura Router */}
          <Routes> {/* Define las rutas */}
            <Route path="/" element={<Home />} />
            <Route element={<PublicRoute />}>
              <Route path="/formulario" element={<Formulario />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ingresar" element={<Ingresar />} />
            </Route>
            <Route path="/menu" element={<Menu />} />
            <Route path="/contacto" element={<Contacto />} />

            <Route element={<ProtectedRoute allowedRoles={['empleado', 'admin']} />}>
              <Route path="/AdminProductos" element={<AdminProductos />} />
              <Route path="/AdminBebidas" element={<AdminBebidas />} />
              <Route path="/GestionPedidos" element={<GestionPedidos />} />
              <Route path="/AdminPapas" element={<AdminPapas />} />
              <Route path="/AdminBiteBox" element={<AdminBiteBox />} />
              <Route path="/AdminInsumos" element={<AdminInsumos />} />
              <Route path="/AdminPpal" element={<AdminPpal />} />
              <Route path="/AsientosContables" element={<AsientosContables />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['empleado', 'admin', 'cliente', 'empleadoInactivo']} />}>
              <Route path="/misPedidos" element={<MisPedidosProvider> <MisPedidos /> </MisPedidosProvider>} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/perfilUsuario" element={<PerfilUsuario />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/Administradores" element={<Administradores />} />
            </Route>


          </Routes>
        </Router>
      </DataProvider>
    </UserProvider>
  </React.StrictMode>

);