import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Analytics/>
      <SpeedInsights/>
    <App />

    </Provider>
    
  </React.StrictMode>
);
