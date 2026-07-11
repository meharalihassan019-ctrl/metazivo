import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and silence the environment-specific read-only window.fetch assignment error
if (typeof window !== "undefined") {
  // Classic window.onerror handler (returning true silences the error completely)
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || "");
    if (
      msgStr.includes("Cannot set property fetch") ||
      msgStr.includes("fetch of #<Window>") ||
      (msgStr.includes("fetch") && msgStr.includes("getter"))
    ) {
      console.warn("Muted browser/iframe environment fetch override restriction via window.onerror.");
      return true; // Silence the error
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  const silenceFetchError = (event: ErrorEvent) => {
    if (event.message && (
      event.message.includes("Cannot set property fetch") || 
      event.message.includes("fetch of #<Window>") ||
      (event.message.includes("fetch") && event.message.includes("getter"))
    )) {
      event.preventDefault();
      console.warn("Muted browser/iframe environment fetch override restriction.");
    }
  };
  window.addEventListener("error", silenceFetchError);

  const silencePromiseError = (event: PromiseRejectionEvent) => {
    if (event.reason && event.reason.message && (
      event.reason.message.includes("Cannot set property fetch") ||
      event.reason.message.includes("fetch of #<Window>") ||
      (event.reason.message.includes("fetch") && event.reason.message.includes("getter"))
    )) {
      event.preventDefault();
      console.warn("Muted browser/iframe environment fetch override restriction (Promise).");
    }
  };
  window.addEventListener("unhandledrejection", silencePromiseError);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

