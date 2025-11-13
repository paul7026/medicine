import { createBrowserRouter } from 'react-router-dom'

import { AdminsPage } from '@pages/AdminsPage'
import { AffiliatePage } from '@pages/AffiliatePage'
import { ChatsPage } from '@pages/ChatsPage'
import { ClinicsPage } from '@pages/ClinicsPage'
import { LoginPage } from '@pages/LoginPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilesPage } from '@pages/ProfilesPage'
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
        path: 'profiles',
        element: <ProfilesPage />,
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
        path: 'chats',
        element: <ChatsPage />,
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
