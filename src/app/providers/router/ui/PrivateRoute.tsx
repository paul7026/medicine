import { Navigate } from 'react-router-dom'

import { WebSocketProvider } from '@app/providers/WebSocketProvider'

import { useLocalStorageState } from '@shared/hooks/useLocalStorageState'
import { cookies } from '@shared/http/cookies'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [tenant] = useLocalStorageState('tenant')

  const isAuth = cookies.get('access_token') && tenant ? true : false

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  // if (!hasRequiredAccess || hasExcludedRole) {
  //   return <Navigate to="/" />
  // }

  return <WebSocketProvider>{children}</WebSocketProvider>
}
