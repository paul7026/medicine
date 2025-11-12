import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Layout } from '@widgets/Layout'

import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'

import styles from './MainPage.module.scss'

const MainPage = () => {
  return (
    <Layout>
      <Box className={styles.main} id="mainPage">
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </Box>
    </Layout>
  )
}

export default MainPage
