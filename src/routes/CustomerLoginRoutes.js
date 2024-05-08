import { lazy } from 'react';

// project-imports
// import GuestGuard from 'utils/route-guard/GuestGuard';
// import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
// import UserGuestGuard from 'utils/route-guard/UserGuestGuard';
import CustomerCommonLayout from 'customerLayout/CommonLayout';
import CustomerGuestGuard from 'utils/route-guard/CustomerGuestGuard ';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/Customer-auth1/Customer-code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const CustomerLoginRoutes = {
  path: '/customer',
  children: [
    {
      path: '/customer',
      element: (
        <CustomerGuestGuard>
          <CustomerCommonLayout />
        </CustomerGuestGuard>
      ),
      children: [
        {
          path: '/customer/login',
          element: <AuthLogin />
        },
        {
          path: '/customer/register',
          element: <AuthRegister />
        },
        {
          path: '/customer/forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: '/customer/check-mail',
          element: <AuthCheckMail />
        },
        {
          path: '/customer/reset-password',
          element: <AuthResetPassword />
        },
        {
          path: '/customer/code-verification',
          element: <AuthCodeVerification />
        }
      ]
    }
  ]
};

export default CustomerLoginRoutes;
