import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import DashboardLayout from 'src/layouts/ClubDashboardLayout';
import DocsLayout from 'src/layouts/DocsLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/home/HomeView/index2';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import ClubDashboardLayout from 'src/layouts/Club/ClubDashboardLayout';
import ClubDashboardLayoutBack from 'src/layouts/Club/ClubDashboardLayoutBack';
import ClubDashboardLayoutBackNoBottom from 'src/layouts/Club/ClubDashboardLayoutBackNoBottom';
import { useMediaQuery, useTheme } from '@mui/material';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/',
    component: lazy(() => import('src/views/auth/Login'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/otp',
    component: lazy(() => import('src/views/auth/LoginOTP'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/password',
    component: lazy(() => import('src/views/auth/LoginPass'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/entry',
    component: lazy(() => import('src/views/auth/Entry'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    // component: lazy(() => import('src/views/auth/LoginView'))
    component: lazy(() => import('src/views/auth/Login'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/identity',
    // component: lazy(() => import('src/views/auth/LoginView'))
    component: lazy(() => import('src/views/auth/IdentityInfo'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/location',
    // component: lazy(() => import('src/views/auth/LoginView'))
    component: lazy(() => import('src/views/auth/Location'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/work',
    // component: lazy(() => import('src/views/auth/LoginView'))
    component: lazy(() => import('src/views/auth/Work'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/registerPass',
    // component: lazy(() => import('src/views/auth/LoginView'))
    component: lazy(() => import('src/views/auth/EnterPassword'))
  },
  // {
  //   exact: true,
  //   path: '/login-unprotected',
  //   component: lazy(() => import('src/views/auth/LoginView'))
  // },
  // {
  //   exact: true,
  //   guard: GuestGuard,
  //   path: '/register',
  //   component: lazy(() => import('src/views/auth/RegisterView'))
  // },
  // {
  //   exact: true,
  //   path: '/register-unprotected',
  //   component: lazy(() => import('src/views/auth/RegisterView'))
  // },
  {
    exact: true,
    guard: GuestGuard,
    path: '/club/newComment',
    layout: ClubDashboardLayoutBackNoBottom,
    component: lazy(() => import('src/views/club/Comments/NewComment'))
  },
  {
    path: '/club',
    // guard: AuthGuard,
    guard: GuestGuard,
    layout: ClubDashboardLayout,
    routes: [
      {
        exact: true,
        path: '/club/awards',
        component: lazy(() => import('src/views/club/Awards/index'))
      },
      {
        exact: true,
        path: '/club/getAwards',
        layout: ClubDashboardLayoutBack,
        component: lazy(() => import('src/views/club/Awards/GetAwards'))
      },
      {
        exact: true,
        path: '/club/comments',
        component: lazy(() => import('src/views/club/Comments'))
      },
      {
        exact: true,
        path: '/club/received',
        // layout: ClubDashboardLayout,
        component: lazy(() => import('src/views/club/Received'))
      },
      {
        exact: true,
        path: '/club/receivedItem',
        layout: ClubDashboardLayoutBack,
        component: lazy(() => import('src/views/club/Received/ReceivedItem'))
      },
      {
        exact: true,
        path: '/club/competition',
        // layout: ClubDashboardLayoutBack,
        component: lazy(() => import('src/views/club/Competition'))
      },
      {
        exact: true,
        path: '/club/newCompetition',
        layout: ClubDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/club/Competition/NewCompetition')
        )
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/docs',
    layout: DocsLayout,
    routes: [
      {
        exact: true,
        path: '/docs',
        component: () => <Redirect to="/docs/welcome" />
      },
      {
        exact: true,
        path: '/docs/welcome',
        component: lazy(() => import('src/views/docs/WelcomeView'))
      },
      {
        exact: true,
        path: '/docs/getting-started',
        component: lazy(() => import('src/views/docs/GettingStartedView'))
      },
      {
        exact: true,
        path: '/docs/environment-variables',
        component: lazy(() => import('src/views/docs/EnvironmentVariablesView'))
      },
      {
        exact: true,
        path: '/docs/deployment',
        component: lazy(() => import('src/views/docs/DeploymentView'))
      },
      {
        exact: true,
        path: '/docs/api-calls',
        component: lazy(() => import('src/views/docs/APICallsView'))
      },
      {
        exact: true,
        path: '/docs/analytics',
        component: lazy(() => import('src/views/docs/AnalyticsView'))
      },
      {
        exact: true,
        path: '/docs/authentication',
        component: lazy(() => import('src/views/docs/AuthenticationView'))
      },
      {
        exact: true,
        path: '/docs/routing',
        component: lazy(() => import('src/views/docs/RoutingView'))
      },
      {
        exact: true,
        path: '/docs/settings',
        component: lazy(() => import('src/views/docs/SettingsView'))
      },
      {
        exact: true,
        path: '/docs/state-management',
        component: lazy(() => import('src/views/docs/StateManagementView'))
      },
      {
        exact: true,
        path: '/docs/theming',
        component: lazy(() => import('src/views/docs/ThemingView'))
      },
      {
        exact: true,
        path: '/docs/support',
        component: lazy(() => import('src/views/docs/SupportView'))
      },
      {
        exact: true,
        path: '/docs/changelog',
        component: lazy(() => import('src/views/docs/ChangelogView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pricing/PricingView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
