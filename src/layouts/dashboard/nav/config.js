// component
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SvgColor from '../../../components/svg-color';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RuleIcon from '@mui/icons-material/Rule';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ContactsIcon from '@mui/icons-material/Contacts';
import DepartmentPage from '../../../pages/DepartmentPage';
import EmployeePage from '../../../pages/EmployeePage';
import ContactPage from '../../../pages/ContactPage';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import EmailIcon from '@mui/icons-material/Email';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import DraftsIcon from '@mui/icons-material/Drafts';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const AIIcon = () => (
  <SvgColor
    src={`/assets/icons/navbar/ic_ai.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export const rootnavConfig = [

  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'root',
    path: '/root',
    icon: <AdminPanelSettingsIcon />
  }
];


export const adminnavConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Group Object',
    icon: <GroupWorkIcon />,
    children: [
      {
        id: '0',
        title: 'Human Resource',
        children: [
          {
            id: '1', title: 'Department', path: '/group-object/department', element: <DepartmentPage />
          },
          {
            id: '2', title: 'Employee', path: '/group-object/employee', element: <EmployeePage />
          },

        ]
      },
      {
        id: '3',
        title: 'Customer Relationship',
        children: [
          {
            id: '4',
            title: 'Contact',
            path: '/group-object/contact', element: <ContactPage />
          },

        ]
      }
    ]
  },
  {
    title: 'settings',
    icon: <SettingsIcon />,
    children: [
      {
        id: '1',
        title: 'Object Management',
        path: '/settings/object-management',
        icon: <ControlPointIcon />
      },
      {
        id: '7',
        title: 'Custom View',
        path: '/settings/custom-view',
        icon: <RemoveRedEyeIcon />
      },
      {
        id: '4',
        title: 'Workflow',
        path: '/settings/workflow',
        icon: <SwapCallsIcon />
      },
      {
        id: '6',
        title: 'AI Analysis',
        path: '/settings/models/AI-prepare',
        icon: <ModelTrainingIcon />
      },
      
      {
        id: '2',
        title: 'Email Template',
        path: '/settings/email-template',
        icon: <DraftsIcon />
      },
      {
        id: '5',
        title: 'Mailbox',
        path: '/settings/mailbox',
        icon: <EmailIcon />
      },
      {
        id: '3',
        title: 'User Management',
        path: '/settings/user-management',
        icon: <ManageAccountsIcon />
      },
      
    ]
  }
];

export const usernavConfig = [

  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blogs',
    icon: icon('ic_blog'),
  },
];


