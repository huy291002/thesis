// pages
import BlogPage from '../pages/BlogPage';
import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import RootPage from '../pages/RootPage';
import Page403 from '../pages/Page403';
import ObjectManagePage from '../pages/ObjectManagePage';
import InboundRulePage from '../pages/InboundRulePage';
import WorkFlowPage from '../pages/WorkFlowPage';
import DepartmentPage from '../pages/DepartmentPage';
import EmployeePage from '../pages/EmployeePage';
import RecordPage from '../pages/RecordPage';
import MailboxPage from '../pages/MailboxPage';
import WorkflowAddPage from '../pages/WorkflowAddPage';
import AIPreparePage from '../pages/AIPreparePage';
import EmailTemplate from '../pages/EmailTemplatePage';
import CustomViewPage from '../pages/CustomViewPage';
import ModelPage from '../pages/ModelPage';
import DashboardConfigPage from '../pages/DashboardConfigPage';


export const ChildrenRootRoutes = [{ path: 'users', element: <RootPage />, index: true }];

export const ChildrenAdminRoutes = [
  {
    path: '/dashboard',
    element: <DashboardAppPage />,
    index: true,
  },
  {
    path: '/dashboard/configure',
    element: <DashboardConfigPage />,
    index: true,
  },
  // {
  //   path: '/group-object',
  //   children : [
  //     {
  //       id: '0',
  //       children: [
  //         {
  //           id: '1', title: 'Department', path: '/group-object/department', element: <DepartmentPage />
  //         },
  //         {
  //           id: '2', title: 'Employee', path: '/group-object/employee', element: <EmployeePage />
  //         },
          
  //       ]
  //     },
  //     {
  //       id: '3',
  //       children: [
  //         {
  //           id: '4',
  //           path: '/group-object/contact', element: <BlogPage />
  //         },
          
  //       ]
  //     }

  //   ]
  // },
  {
    path: '/group-object/:groupobjectid/:objectid',
    element: <RecordPage />
  },
  {
    path: '/settings',
    children: [
      {
        children: [
          {
            path: '/settings/object-management', element: <ObjectManagePage/>
          },
          {
            path: '/settings/email-template', element: <EmailTemplate />
          },
          {
            path: '/settings/user-management', element: <UserPage />
          },
          {
            path: '/settings/workflow', element: <WorkFlowPage />
          },
          {
            path: '/settings/workflow/add', element: <WorkflowAddPage />
          },
          {
            path: '/settings/workflow/:workflowid', element: <WorkflowAddPage />
          },
          {
            path: '/settings/mailbox', element: <MailboxPage />
          },
          {
            path: '/settings/models', element: <ModelPage />
          },
          {
            path: '/settings/models/AI-prepare', element: <AIPreparePage />
          },
          {
            path: '/settings/custom-view', element: <CustomViewPage />
          },
          {
            path: '/settings/custom-view/:objectid', element: <CustomViewPage />
          },
          {
            path: '/settings/custom-view/:objectid/:recordid', element: <CustomViewPage />
          }
          
        ]
      },
    ]
  }
];

export const ChildrenUserRoutes = [
  { path: 'dashboard', element: <DashboardAppPage />, index: true },
  { path: 'users', element: <UserPage /> },
  { path: 'products', element: <ProductsPage /> },
  { path: 'blogs', element: <BlogPage /> },
];
