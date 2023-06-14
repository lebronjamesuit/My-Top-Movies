import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { Provider } from './context/authenContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

root.render(

<Provider>
   <App />
</Provider>

);
