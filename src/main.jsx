import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
});

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);