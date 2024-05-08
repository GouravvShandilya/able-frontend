import { lazy } from 'react';

// project-imports
import GuestGuard from 'utils/route-guard/GuestGuard';
// import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AdminCommonLayout from 'adminlayout/CommonLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-login.js')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-register.js')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/Admin-auth1/Admin-code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <AdminCommonLayout />
    </GuestGuard>
  ),

  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: 'check-mail',
      element: <AuthCheckMail />
    },
    {
      path: 'reset-password',
      element: <AuthResetPassword />
    },
    {
      path: 'code-verification',
      element: <AuthCodeVerification />
    }
  ]
};

export default LoginRoutes;
