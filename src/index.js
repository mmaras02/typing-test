import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TestModeProvider } from './context/TestModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TestModeProvider>
      <App />
    </TestModeProvider>
);