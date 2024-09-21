import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/src/carousel';
import './styles.css';
import './normalize.css';
// import { Menu } from './bigBite/pages/Menu';
// import './bigBite/css/menu.css';
// import {Formulario} from './bigBite/pages/Formulario';
import { Home } from './bigBite/pages/Home'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
