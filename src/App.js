import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
// import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import {
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme
} from '@mui/material';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import GlobalStyles from 'src/components/GlobalStyles';
import ScrollReset from 'src/components/ScrollReset';
// import CookiesNotification from 'src/components/CookiesNotification';
// import GoogleAnalytics from 'src/components/GoogleAnalytics';
// import SettingsNotification from 'src/components/SettingsNotification';
import { AuthProvider } from 'src/contexts/JWTAuthContext';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import routes, { renderRoutes } from 'src/routes';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ScoreProvider } from './contexts/ScoreContext';
import { SaleSearchProvider } from './contexts/SalesSearchContext';
import { SaleOrderProvider } from './contexts/SaleOrderContext';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();

const App = () => {
  const { settings } = useSettings();

  if (process.env.NODE_ENV !== 'development') console.log = () => {};

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  const cacheRtl = createCache({
    key: settings.direction === 'rtl' ? 'cssrtl' : 'cssltr',
    prepend: true,
    stylisPlugins: settings.direction === 'rtl' ? [rtlPlugin] : []
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            <SnackbarProvider dense maxSnack={3}>
              <BrowserRouter history={history}>
                <AuthProvider>
                  <ScoreProvider>
                    <SaleSearchProvider>
                      <SaleOrderProvider>
                        <GlobalStyles />
                        <ScrollReset />
                        {/* <GoogleAnalytics /> */}
                        {/* <CookiesNotification /> */}
                        {/* <SettingsNotification /> */}
                        {renderRoutes(routes)}
                      </SaleOrderProvider>
                    </SaleSearchProvider>
                  </ScoreProvider>
                </AuthProvider>
              </BrowserRouter>
            </SnackbarProvider>
            {/* </LocalizationProvider> */}
          </StylesProvider>
        </CacheProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
