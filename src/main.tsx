import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App'
import './index.css'

// Gestion simple des erreurs globales
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Erreur globale:', message, source, lineno, error);
};
window.onunhandledrejection = (event) => {
  console.error('Promesse non gérée:', event.reason);
};

console.log("Starting application");

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log("Render complete");
} else {
  console.error("Root element not found! The application cannot be rendered.");
}
