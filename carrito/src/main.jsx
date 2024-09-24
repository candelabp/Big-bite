import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Carrito from './Component/Carrito/Carrito.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Carrito />
    <App />
  </StrictMode>,
)
