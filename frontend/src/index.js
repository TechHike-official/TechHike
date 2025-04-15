import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Analytics } from "@vercel/analytics/react"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Analytics/>
    <App />

    </Provider>
    
  </React.StrictMode>
);
