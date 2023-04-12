import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'prismjs/prism';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'nprogress/nprogress.css';
import 'src/assets/css/prism.css';
// import 'src/assets/fonts/iranSans/IRANSans-Bold-web.ttf';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import * as serviceWorker from 'src/serviceWorker';
import store from 'src/store';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import App from 'src/App';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { initializeFirebase } from './push-notification';

enableES5();

const container = document.getElementById('root');
const root = createRoot(container);

// window.addEventListener(
//   'orientationchange',
//   function() {
//     if (window.orientation == -90) {
//       document.getElementById('orient').className = 'orientright';
//     }
//     if (window.orientation == 90) {
//       document.getElementById('orient').className = 'orientleft';
//     }
//     if (window.orientation == 0) {
//       document.getElementById('orient').className = '';
//     }
//   },
//   true
// );

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://5349280788874c93af9c8323f751e3fb@sentry.hamravesh.com/5269',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
}

initializeFirebase();

root.render(
  <Provider store={store}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>
);

serviceWorker.register();
