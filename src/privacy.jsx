import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from './PrivacyPage.jsx';
import './styles/global.css';

const app = (
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>
);
const root = document.getElementById('root');

if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
