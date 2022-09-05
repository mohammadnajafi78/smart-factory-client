import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import ClubDashboardLayout from 'src/layouts/Club/ClubDashboardLayout';
import ClubDashboardLayoutBack from 'src/layouts/Club/ClubDashboardLayoutBack';
import ClubDashboardLayoutBackNoBottom from 'src/layouts/Club/ClubDashboardLayoutBackNoBottom';
import ManagementDashboardLayout from 'src/layouts/Management/ManagementDashboardLayout';
import HomeDashboardLayout from 'src/layouts/Home';
import FormsDashboardLayout from './layouts/Forms';

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
    path: '/table',
    component: lazy(() => import('src/components/TableExample'))
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
    component: lazy(() => import('src/views/auth/Login'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/identity',
    component: lazy(() => import('src/views/auth/IdentityInfo'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/location',
    component: lazy(() => import('src/views/auth/Location'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/work',
    component: lazy(() => import('src/views/auth/Work'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/registerPass',
    component: lazy(() => import('src/views/auth/EnterPassword'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/home',
    layout: HomeDashboardLayout,
    component: lazy(() => import('src/views/home'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile/detail',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile/Mobile/ProfileDetail'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile/identity',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile/Mobile/Identity'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile/location',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile/Mobile/Location'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile/work',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile/Mobile/Work'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/profile/edit',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/profile/Desktop/ProfileEdit'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/message',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/message'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/club/newComment',
    layout: ClubDashboardLayoutBackNoBottom,
    component: lazy(() => import('src/views/club/Comments/NewComment'))
  },
  {
    path: '/club',
    // guard: GuestGuard,
    guard: AuthGuard,
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
        exact: true,
        path: '/club/participantComp',
        layout: ClubDashboardLayoutBack,
        component: lazy(() =>
          import(
            'src/views/club/Competition/NewCompetition/Mobile/ParticipateNewComp'
          )
        )
      },
      {
        exact: true,
        path: '/club/competitionDetails',
        layout: ClubDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/club/Competition/CompetitionDetails')
        )
      },
      {
        component: () => <Redirect to="/club/awards" />
      }
    ]
  },
  {
    path: '/management',
    // guard: GuestGuard,
    guard: AuthGuard,
    layout: ManagementDashboardLayout,
    routes: [
      {
        exact: true,
        path: '/management/user/home',
        component: lazy(() => import('src/views/management/Users/Home'))
      },
      {
        exact: true,
        path: '/management/user/newUser',
        component: lazy(() => import('src/views/management/Users/NewUser'))
      },
      {
        exact: true,
        path: '/management/user/newUser/details',
        component: lazy(() =>
          import('src/views/management/Users/NewUser/Desktop/UserDetails')
        )
      },
      {
        exact: true,
        path: '/management/user/allUsers',
        component: lazy(() => import('src/views/management/Users/AllUsers'))
      },
      {
        exact: true,
        path: '/management/club/competition',
        component: lazy(() => import('src/views/management/Club/Competition'))
      },
      {
        exact: true,
        path: '/management/club/competition/new',
        component: lazy(() =>
          import('src/views/management/Club/Competition/Desktop/NewCompetition')
        )
      },
      {
        exact: true,
        path: '/management/club/competition/details',
        component: lazy(() =>
          import('src/views/management/Club/Competition/Desktop/Competition')
        )
      },
      {
        exact: true,
        path: '/management/club/comment',
        component: lazy(() => import('src/views/management/Club/Comment'))
      },
      {
        exact: true,
        path: '/management/club/gifts',
        component: lazy(() => import('src/views/management/Club/Gifts'))
      },
      {
        exact: true,
        path: '/management/club/lottery',
        component: lazy(() => import('src/views/management/Club/Lottery'))
      },
      {
        exact: true,
        path: '/management/club/setting',
        component: lazy(() => import('src/views/management/Club/Setting'))
      },
      {
        component: () => <Redirect to="/management/user/home" />
      }
    ]
  }
];

export default routes;
