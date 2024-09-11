import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import Context from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <App />
    <ToastContainer />
    </Context>
  </StrictMode>,
)
