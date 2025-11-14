import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { WebSocketProvider } from '@app/providers/WebSocketProvider'

import { getWhoAmIApi } from '@entities/auth'
import { whoAmISelector } from '@entities/auth/store/selectors'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useLocalStorageState } from '@shared/hooks/useLocalStorageState'
import { cookies } from '@shared/http/cookies'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const dispatch = useAppDispatch()
  const [tenant] = useLocalStorageState('tenant')
  const { whoAmI, status } = useAppSelector(whoAmISelector)

  const accessToken = cookies.get('access_token')
  const hasToken = !!accessToken

  // Check if we have token but no user data
  const needsUserData = hasToken && !whoAmI && status !== 'pending'

  useEffect(() => {
    // If we have a token but no user data, fetch it
    if (needsUserData) {
      dispatch(getWhoAmIApi())
    }
  }, [dispatch, needsUserData])

  // Redirect to login if no token
  if (!hasToken) {
    return <Navigate replace to="/login" />
  }

  // Show loading while fetching user data
  if (status === 'pending' || (hasToken && !whoAmI && !tenant)) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  // If token exists but fetch failed (invalid token), redirect to login
  if (status === 'failed' && !whoAmI) {
    cookies.remove('access_token', { path: '/' })
    cookies.remove('refresh_token', { path: '/' })
    localStorage.clear()

    return <Navigate replace to="/login" />
  }

  // User is authenticated
  if (whoAmI && tenant) {
    return <WebSocketProvider>{children}</WebSocketProvider>
  }

  // Fallback: if we have token but no user data after loading, redirect to login
  return <Navigate replace to="/login" />
}
