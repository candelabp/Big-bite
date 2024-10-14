import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './userContext'; // Importa el UserProvider
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

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Variables de configuración de Auth0
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      audience={audience}
      scope="openid profile email"
    >
      <UserProvider> {/* Envuelve la aplicación con UserProvider */}
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
    </Auth0Provider>
  </React.StrictMode>
);