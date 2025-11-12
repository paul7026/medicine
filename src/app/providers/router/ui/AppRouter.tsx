import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { CircularProgress } from '@shared/ui/CircularProgress'

import { router } from '../config/routeConfig'

export const AppRouter = () => {
  return (
    <Suspense fallback={<CircularProgress isFullPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
