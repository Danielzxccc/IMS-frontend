import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import './index.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

axios.defaults.baseURL = 'https://ims-backend.onrender.com'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
)
