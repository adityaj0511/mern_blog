import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <PersistGate persistor={persistor}>
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
  </PersistGate>
  </Provider>
)
