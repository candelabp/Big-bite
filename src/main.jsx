import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/src/carousel';
import './styles.css';
import './normalize.css';
//import { Menu } from './bigBite/pages/Menu';
//import {Formulario} from './bigBite/pages/Formulario';  
//import {Formulario} from './bigBite/pages/Formulario';
//import { Login } from './bigBite/pages/Login';
import { Ingresar } from './bigBite/pages/Ingresar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ingresar/>
  </StrictMode>,
)
