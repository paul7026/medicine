import { createBrowserRouter } from 'react-router-dom'

import { AdminsPage } from '@pages/AdminsPage'
import { AffiliatePage } from '@pages/AffiliatePage'
import { ChatsPage } from '@pages/ChatsPage'
import { ClinicsPage } from '@pages/ClinicsPage'
import { DocumentsPage } from '@pages/DocumentsPage'
import { EmployeesPage } from '@pages/EmployeesPage'
import { FavourCategoriesPage } from '@pages/FavourCategoriesPage'
import { FavoursPage } from '@pages/FavoursPage'
import { LoginPage } from '@pages/LoginPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { PromptsPage } from '@pages/PromptsPage'
import { ScheduleConnectionsPage } from '@pages/ScheduleConnectionsPage'
import { UsersPage } from '@pages/UsersPage'

import { PrivateRoute } from '../ui/PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainPage />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: '/',
      //   element: <HomePage />,
      // },
      {
        path: 'admins',
        element: <AdminsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'employees',
        element: <EmployeesPage />,
      },
      {
        path: 'clinics',
        element: <ClinicsPage />,
      },
      {
        path: 'affiliate',
        element: <AffiliatePage />,
      },
      {
        path: 'favours',
        element: <FavoursPage />,
      },
      {
        path: 'chats',
        element: <ChatsPage />,
      },
      {
        path: 'prompts',
        element: <PromptsPage />,
      },
      {
        path: 'favour_categories',
        element: <FavourCategoriesPage />,
      },
      {
        path: 'documents',
        element: <DocumentsPage />,
      },
      {
        path: 'schedule-connections',
        element: <ScheduleConnectionsPage />,
      },
    ],
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
