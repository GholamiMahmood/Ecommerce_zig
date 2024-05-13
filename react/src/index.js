import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from './services/store';
// pour langage
import './common/i18n.js';

/* ***************************************** Axios ************************************************
 Pour utiliser Axios, suivez ces étapes :
    1-Installez Axios en exécutant npm install axios.
    2-Intégrez <App> dans <Provider store={store}>.
    3-Créez un fichier store.js dans le dossier services.
    4-Créez un répertoire de réducteurs, puis déplacez le fichier AuthSlice.js dans ce répertoire.
Il enregistre les informations de l'utilisateur ou de l'administrateur lorsqu'ils se connectent.
 ************************************************************************************************ */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store} >     
          <App />          
     </Provider>         
  </React.StrictMode>
);
reportWebVitals();
