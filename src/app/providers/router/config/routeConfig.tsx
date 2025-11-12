import { createBrowserRouter } from 'react-router-dom'

import { AdminsPage } from '@pages/AdminsPage'
// import { LoginPage } from '@pages/LoginPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
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
    ],
  },

  // {
  //   path: RoutePath.login,
  //   element: <LoginPage />,
  // },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
