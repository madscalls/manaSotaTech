import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import FaqPage from './FaqPage.jsx';
import PrivacyPage from './PrivacyPage.jsx';

const routes = {
  'index.html': App,
  'faq/index.html': FaqPage,
  'privacy/index.html': PrivacyPage,
};

export const files = Object.keys(routes);

export function render(file) {
  const Page = routes[file];
  return renderToString(
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
}
