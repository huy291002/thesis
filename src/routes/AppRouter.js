import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import jwt from 'jwt-decode';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
// pages
import LoginPage from '../pages/LoginPage';
import Page403 from '../pages/Page403';
import Page404 from '../pages/Page404';

import { ChildrenRootRoutes, ChildrenAdminRoutes, ChildrenUserRoutes } from './RouteConfig';

function AppRouter() {
  let userRole;
  let childrenRoutes;
  const accessToken = window.localStorage.getItem('access_token');
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');

  if (accessToken) {
    const user = jwt(accessToken);
    userRole = user.system_role;
    if (user.system_role === 'root') {
      childrenRoutes = ChildrenRootRoutes;
    } else if (user.system_role === 'admin') {
      childrenRoutes = ChildrenAdminRoutes;
    } else if (user.system_role === 'user') {
      childrenRoutes = ChildrenUserRoutes;
    }
  }
  const routes = useRoutes([
    {
      path: '',
      element:
        accessToken && isLoggedIn ? (
          window.location.pathname === '/' ? (
            userRole !== 'root' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/users" replace />
            )
          ) : (
            <DashboardLayout />
          )
        ) : (
          <Navigate to="/login" />
        ),
      children: childrenRoutes,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);
  return routes;
}

export default AppRouter;
