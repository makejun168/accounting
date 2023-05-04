import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import 'lib-flexible/flexible'
import './index.css'
import App from './App'
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
