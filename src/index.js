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
import 'src/__mocks__';
import 'src/assets/css/prism.css';
// import 'src/assets/fonts/iranSans/IRANSans-Bold-web.ttf';
import 'src/mixins/chartjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { enableES5 } from 'immer';
import * as serviceWorker from 'src/serviceWorker';
import store from 'src/store';
import { SettingsProvider } from 'src/contexts/SettingsContext';
import App from 'src/App';
import './i18n';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

enableES5();

const container = document.getElementById('root');
const root = createRoot(container);

Sentry.init({
  dsn: 'https://5f56610a4f514c4c917ad87f475e9022@sentry.hamravesh.com/376',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

root.render(
  <Provider store={store}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>
);

serviceWorker.register();
