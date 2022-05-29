import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as utils from './utils';
import './styles/reset.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// @ts-ignore
window.seed = utils.seed;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
