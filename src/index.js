import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {config: {withCredentials: true}});
axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


