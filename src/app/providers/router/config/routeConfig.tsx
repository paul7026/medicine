import { createBrowserRouter } from 'react-router-dom'

import { AdminsPage } from '@pages/AdminsPage'
import { ChatsPage } from '@pages/ChatsPage'
import { ClinicsPage } from '@pages/ClinicsPage'
import { FilialsPage } from '@pages/FilialsPage'
import { LoginPage } from '@pages/LoginPage'
// import { LoginPage } from '@pages/LoginPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilesPage } from '@pages/ProfilesPage'
import { UsersPage } from '@pages/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // <PrivateRoute>
      <MainPage />
      // </PrivateRoute>
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
        path: 'filials',
        element: <FilialsPage />,
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
