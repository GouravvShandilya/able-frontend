import { lazy } from 'react';

// project-imports
// import GuestGuard from 'utils/route-guard/GuestGuard';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import UserGuestGuard from 'utils/route-guard/UserGuestGuard';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/User-auth1/User-login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/User-auth1/User-register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/User-auth1/User-forgot-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/User-auth1/User-check-mail')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/User-auth1/User-reset-password')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/User-auth1/User-code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const UserLoginRoutes = {
  path: '/user',
  children: [
    {
      path: '/user',
      element: (
        <UserGuestGuard>
          <CommonLayout />
        </UserGuestGuard>
      ),
      children: [
        {
          path: '/user/login',
          element: <AuthLogin />
        },
        {
          path: '/user/register',
          element: <AuthRegister />
        },
        {
          path: '/user/forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: '/user/check-mail',
          element: <AuthCheckMail />
        },
        {
          path: '/user/reset-password',
          element: <AuthResetPassword />
        },
        {
          path: '/user/code-verification',
          element: <AuthCodeVerification />
        }
      ]
    }
  ]
};

export default UserLoginRoutes;
