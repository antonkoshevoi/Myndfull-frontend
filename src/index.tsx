import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TokenProvider } from 'context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <TokenProvider>
            <App/>
    </TokenProvider>
);

