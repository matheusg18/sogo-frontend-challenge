import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import App from './App';
import Alert from './components/Alert';
import './sass/reset.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={Alert} position="bottom center" timeout={3000}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
