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
import SaleDashboardLayout from './layouts/Sales/SalesDashboardLayout';
import SalesDashboardLayoutBack from './layouts/Sales/SalesDashboardLayoutBack';
import SalesDashboardLayoutForm from './layouts/Sales/SalesDashboardLayoutForm';
import ProjectDashboardLayout from './layouts/Projects/ProjectsDashboardLayout';
import ProjectDashboardLayoutForm from './layouts/Projects/ProjectsDashboardLayoutForm';
import ProjectDashboardLayoutBack from './layouts/Projects/ProjectsDashboardLayoutBack';
import LmsDashboardLayout from './layouts/Lms/LmsDashboardLayout';
import LmsDashboardLayoutBack from './layouts/Lms/LmsDashboardLayoutBack';
import LmsDashboardLayoutBack2 from './layouts/Lms/LmsDashboardLayoutBack2';

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
    guard: GuestGuard,
    path: '/forgotPass',
    component: lazy(() => import('src/views/auth/ForgotPassword'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/newPassword',
    component: lazy(() => import('src/views/auth/EnterNewPassword'))
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
    path: '/message/messageItem',
    layout: FormsDashboardLayout,
    component: lazy(() => import('src/views/message/MessageItem'))
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
        component: () => <Redirect to="/club/competition" />
      }
    ]
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/products/detail',
    layout: SalesDashboardLayoutBack,
    component: lazy(() => import('src/views/sales/Products/ProductDetail'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/received/detail',
    layout: SalesDashboardLayoutBack,
    component: lazy(() => import('src/views/sales/Received/ReceivedDetail'))
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/detail',
    layout: SalesDashboardLayoutBack,
    component: lazy(() => import('src/views/sales/Send/SendDetail'))
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/tripartite/detail',
    layout: SalesDashboardLayoutBack,
    component: lazy(() => import('src/views/sales/Tripartite/TripartiteDetail'))
  },
  {
    exact: false,
    guard: AuthGuard,
    path: '/sale/received/confirm',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Received/ReceivedDetail/Mobile/AcceptConfirm')
    )
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/payment',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Send/SendDetail/Mobile/AcceptPayment')
    )
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/payment/edit',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Send/SendDetail/Mobile/AcceptPayment2')
    )
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/payment/edit2',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Send/SendDetail/Mobile/AddPayment2')
    )
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/payment/add',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Send/SendDetail/Mobile/AddPayment')
    )
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/received/payment',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Received/ReceivedDetail/Mobile/AcceptPayment')
    )
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/received/payment/add',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Received/ReceivedDetail/Mobile/AddPayment')
    )
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/received/delivery',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Received/ReceivedDetail/Mobile/DeliveryInfo')
    )
  },

  {
    exact: true,
    guard: AuthGuard,
    path: '/sale/send/delivery',
    layout: SalesDashboardLayoutForm,
    component: lazy(() =>
      import('src/views/sales/Send/SendDetail/Mobile/DeliveryConfirm')
    )
  },
  {
    exact: false,
    guard: AuthGuard,
    path: '/sale/products/order',
    layout: SalesDashboardLayoutForm,
    component: lazy(() => import('src/views/sales/Products/Order'))
  },
  {
    path: '/sale',
    guard: AuthGuard,
    layout: SaleDashboardLayout,
    routes: [
      {
        exact: true,
        path: '/sale/products',
        component: lazy(() => import('src/views/sales/Products'))
      },
      {
        exact: true,
        path: '/sale/send',
        component: lazy(() => import('src/views/sales/Send'))
      },
      {
        exact: true,
        path: '/sale/received',
        component: lazy(() => import('src/views/sales/Received'))
      },
      {
        exact: true,
        path: '/management/sale/received',
        component: lazy(() => import('src/views/management/Sale/Received'))
      },
      {
        exact: true,
        path: '/sale/tripartite',
        component: lazy(() => import('src/views/sales/Tripartite'))
      },
      {
        component: lazy(() =>
          import('src/views/sales/Send/SendDetail/Desktop/index')
        )
      }
    ]
  },
  {
    path: '/project',
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: '/project/project',
        layout: ProjectDashboardLayout,
        component: lazy(() => import('src/views/projects/Project/index'))
      },
      {
        exact: true,
        path: '/project/project/new/1',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/Project/NewProject/ProjectInfo')
        )
      },
      {
        exact: true,
        path: '/project/project/new/2',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/Project/NewProject/BuildingInfo')
        )
      },
      {
        exact: true,
        path: '/project/project/new/3',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/Project/NewProject/PhotoInfo')
        )
      },
      {
        exact: true,
        path: '/project/request',
        layout: ProjectDashboardLayout,
        component: lazy(() => import('src/views/projects/MyRequest/index'))
      },
      {
        exact: true,
        path: '/project/request/detail',
        layout: ProjectDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/projects/MyRequest/RequestDetail')
        )
      },
      {
        exact: true,
        path: '/project/request/new',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/RegisterNewRequest')
        )
      },
      {
        exact: true,
        path: '/project/request/new/design/reqInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Design/RequestInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/design/techInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Design/TechnicalInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/design/mapInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Design/MapInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/design/designerInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Design/DesignerInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/design/confirmInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Design/ConfirmInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/bom/reqInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Bom/RequestInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/bom/mapInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Bom/MapInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/bom/confirmInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Bom/ConfirmInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/supervision/supervisorInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/projects/MyRequest/NewRequest/Supervision/SupervisorInfo'
          )
        )
      },
      {
        exact: true,
        path: '/project/request/new/supervision/instructionInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/projects/MyRequest/NewRequest/Supervision/InstructionInfo'
          )
        )
      },
      {
        exact: true,
        path: '/project/request/new/supervision/testInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Supervision/TestInfo')
        )
      },
      {
        exact: true,
        path: '/project/request/new/warranty/reqInfo',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/MyRequest/NewRequest/Warranty/RequestInfo')
        )
      },
      {
        exact: true,
        path: '/project/received',
        layout: ProjectDashboardLayout,
        component: lazy(() => import('src/views/projects/Received/index'))
      },
      {
        exact: true,
        path: '/project/received/detail',
        layout: ProjectDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/projects/Received/ReceivedDetail')
        )
      },
      {
        exact: true,
        path: '/project/received/new',
        layout: ProjectDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/projects/Received/NewRequest/RegisterNewRequest')
        )
      },
      // {
      //   exact: true,
      //   path: '/project/project/new/4',
      //   layout: ProjectDashboardLayoutForm,
      //   component: lazy(() =>
      //     import('src/views/projects/Project/NewProject/PhotoInfo')
      //   )
      // },
      {
        exact: true,
        path: '/project/project/detail',
        layout: ProjectDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/projects/Project/ProjectDetail/index')
        )
      },
      {
        component: lazy(() => import('src/views/projects/Project/index')),
        layout: ProjectDashboardLayout
      }
    ]
  },
  {
    path: '/lms',
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: '/lms/profile',
        layout: LmsDashboardLayout,
        component: lazy(() => import('src/views/lms/Profile/index'))
      },
      {
        exact: true,
        path: '/lms/course',
        layout: LmsDashboardLayout,
        component: lazy(() => import('src/views/lms/Courses'))
      },
      {
        exact: true,
        path: '/lms/course/detail',
        layout: LmsDashboardLayoutBack,
        component: lazy(() => import('src/views/lms/Courses/CourseDetail'))
      },
      {
        exact: true,
        path: '/lms/course/class',
        layout: LmsDashboardLayoutBack2,
        component: lazy(() => import('src/views/lms/Courses/CourseClass'))
      },
      {
        exact: true,
        path: '/lms/exam',
        layout: LmsDashboardLayout,
        component: lazy(() => import('src/views/lms/Exams'))
      },
      {
        exact: true,
        path: '/lms/exam/detail',
        layout: LmsDashboardLayoutBack,
        component: lazy(() => import('src/views/lms/Exams/ExamDetail'))
      },
      {
        exact: true,
        path: '/lms/exam/questions',
        layout: LmsDashboardLayoutBack,
        component: lazy(() => import('src/views/lms/Exams/ExamQuestions'))
      },
      {
        exact: true,
        path: '/lms/calendar',
        layout: LmsDashboardLayout,
        component: lazy(() => import('src/views/lms/Calendar'))
      },
      {
        component: lazy(() => import('src/views/lms/Profile/index')),
        layout: LmsDashboardLayout
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
        path: '/management/user/details',
        component: lazy(() => import('src/views/management/Users/UserProfile'))
      },
      {
        exact: true,
        path: '/management/user/allUsers',
        component: lazy(() => import('src/views/management/Users/AllUsers'))
      },
      {
        exact: true,
        path: '/management/user/setting',
        component: lazy(() => import('src/views/management/Users/Setting'))
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
        path: '/management/club/comment/details',
        component: lazy(() =>
          import('src/views/management/Club/Comment/Desktop/Details')
        )
      },
      {
        exact: true,
        path: '/management/club/gifts',
        component: lazy(() => import('src/views/management/Club/Gifts'))
      },
      {
        exact: true,
        path: '/management/club/gift/new',
        component: lazy(() =>
          import('src/views/management/Club/Gifts/Desktop/NewGift')
        )
      },
      {
        exact: true,
        path: '/management/club/gift/details',
        component: lazy(() =>
          import('src/views/management/Club/Gifts/Desktop/GiftDetails')
        )
      },
      {
        exact: true,
        path: '/management/club/giftBox/new',
        component: lazy(() =>
          import('src/views/management/Club/Gifts/Desktop/NewGiftBox')
        )
      },
      {
        exact: true,
        path: '/management/club/giftBox/details',
        component: lazy(() =>
          import('src/views/management/Club/Gifts/Desktop/GiftBoxRow')
        )
      },
      {
        exact: true,
        path: '/management/club/lottery',
        component: lazy(() => import('src/views/management/Club/Lottery'))
      },
      {
        exact: true,
        path: '/management/club/lottery/new',
        component: lazy(() =>
          import('src/views/management/Club/Lottery/Desktop/NewLottery')
        )
      },
      {
        exact: true,
        path: '/management/club/lottery/details',
        component: lazy(() =>
          import('src/views/management/Club/Lottery/Desktop/LotteryRow')
        )
      },

      {
        exact: true,
        path: '/management/club/setting',
        component: lazy(() => import('src/views/management/Club/Setting'))
      },
      {
        exact: true,
        path: '/management/sale/home',
        component: lazy(() => import('src/views/management/Sale/Home'))
      },
      {
        exact: true,
        path: '/management/sale/received',
        component: lazy(() => import('src/views/management/Sale/Received'))
      },
      {
        exact: true,
        path: '/management/sale/setting/products',
        component: lazy(() =>
          import('src/views/management/Sale/Setting/Products')
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/products/category',
        component: lazy(() =>
          import(
            'src/views/management/Sale/Setting/Products/Desktop/ProductCategory/ProductCategoryDetail'
          )
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/products/subCategory',
        component: lazy(() =>
          import(
            'src/views/management/Sale/Setting/Products/Desktop/ProductSubCategory/ProductSubCategoryDetail'
          )
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/products/type',
        component: lazy(() =>
          import(
            'src/views/management/Sale/Setting/Products/Desktop/ProductType/ProductTypeDetail'
          )
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/products/product',
        component: lazy(() =>
          import(
            'src/views/management/Sale/Setting/Products/Desktop/Products/ProductDetail'
          )
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/priceList',
        component: lazy(() =>
          import('src/views/management/Sale/Setting/Prices')
        )
      },
      {
        exact: true,
        path: '/management/sale/setting/price',
        component: lazy(() =>
          import('src/views/management/Sale/Setting/Prices/Desktop/PriceTable')
        )
      },
      {
        exact: true,
        path: '/management/sale/report/orders',
        component: lazy(() => import('src/views/management/Sale/Report/Orders'))
      },
      {
        exact: true,
        path: '/management/sale/report/product',
        component: lazy(() =>
          import('src/views/management/Sale/Report/Product')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/sale/received/detail',
        // layout: SalesDashboardLayoutBack,
        component: lazy(() =>
          import('src/views/management/Sale/Received/ReceivedDetail')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/sale/received/payment',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/Sale/Received/ReceivedDetail/Mobile/AcceptPayment'
          )
        )
      },
      {
        exact: false,
        guard: AuthGuard,
        path: '/management/sale/received/confirm',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/Sale/Received/ReceivedDetail/Mobile/AcceptConfirm'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/sale/received/delivery',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/Sale/Received/ReceivedDetail/Mobile/DeliveryInfo'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/sale/received/payment/add',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/Sale/Received/ReceivedDetail/Mobile/AddPayment'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/',
        // layout: SalesDashboardLayoutForm,
        component: () => <Redirect to="/management/project/received/project" />
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/project',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/Project/Index.js')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/project/details',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/projects/received/Project/ProjectDetail/Index'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/design',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/Design/Index.js')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/design/details',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/projects/received/Design/designdetails/Index'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/home',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/Home/index')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/bom',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/BOM/Index')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/bom/details',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/BOM/BomDetails/Index')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/supervision',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/Supervision/Index')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/supervision/details',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/projects/received/Supervision/SupervisionDetails/Index'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/certificate',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/received/Warranty/Index')
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/received/certificate/details',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import(
            'src/views/management/projects/received/Warranty/WarrantyDetails/Index'
          )
        )
      },
      {
        exact: true,
        guard: AuthGuard,
        path: '/management/project/report',
        // layout: SalesDashboardLayoutForm,
        component: lazy(() =>
          import('src/views/management/projects/report/index')
        )
      },
      {
        component: () => <Redirect to="/management/user/home" />
      }
    ]
  }
];

export default routes;
