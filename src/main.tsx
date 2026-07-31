// Safety polyfill for window.fetch getter-only restriction in strict environments
(function() {
  try {
    let target: any = window;
    let desc: PropertyDescriptor | undefined = undefined;
    while (target && !desc) {
      desc = Object.getOwnPropertyDescriptor(target, 'fetch');
      if (!desc) {
        target = Object.getPrototypeOf(target);
      }
    }
    if (desc && desc.get && !desc.set) {
      let currentFetch = window.fetch;
      Object.defineProperty(window, 'fetch', {
        get: () => currentFetch,
        set: (val: typeof fetch) => { currentFetch = val; },
        configurable: true,
        enumerable: true
      });
    }
  } catch (e) {
    // Ignore
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
