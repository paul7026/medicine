import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from '@widgets/Layout'

import { CircularProgress } from '@shared/ui/CircularProgress'

const MainPage = () => {
  return (
    <Layout>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}

export default MainPage
