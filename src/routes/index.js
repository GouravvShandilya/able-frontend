// import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project-imports
// import CommonLayout from 'layout/CommonLayout';
// import Loadable from 'components/Loadable';
import AdminComponentsRoutes from './AdminComponentsRoutes';
import AdminLoginRoutes from './AdminLoginRoutes';
import AdminMainRoutes from './AdminMainRoutes';
import UserComponentsRoutes from './UserComponentsRoutes';
import UserLoginRoutes from './UserLoginRoutes';
import UserMainRoutes from './UserMainRoutes';
import CustomerMainRoutes from './CustomerMainRoutes';
import CustomerLoginRoutes from './CustomerLoginRoutes';
import CustomerComponentsRoutes from './UserComponentsRoutes';
// render - landing page
// const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTES RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    AdminLoginRoutes,
    AdminComponentsRoutes,
    AdminMainRoutes,
    UserLoginRoutes,
    UserComponentsRoutes,
    UserMainRoutes,
    CustomerLoginRoutes,
    CustomerMainRoutes,
    CustomerComponentsRoutes
  ]);
}
