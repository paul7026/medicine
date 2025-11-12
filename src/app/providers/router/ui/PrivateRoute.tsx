import { Navigate } from 'react-router-dom'

import { WebSocketProvider } from '@app/providers/WebSocketProvider'

import { User } from '@entities/auth'

import { useLocalStorageState } from '@shared/hooks/useLocalStorageState'
import { cookies } from '@shared/http/cookies'

interface PrivateRouteProps {
  children: React.ReactNode
  requiredRoles?: User['name'][]
  excludedRoles?: User['name'][]
}

export const PrivateRoute = ({
  children,
  requiredRoles,
  excludedRoles,
}: PrivateRouteProps) => {
  const [currentUser] = useLocalStorageState('currentUser')
  const groups: User[] = currentUser.groups

  const isAuth = cookies.get('token') && currentUser ? true : false

  const hasExcludedRole = excludedRoles
    ? groups.some((group) => excludedRoles.includes(group.name))
    : false

  const hasRequiredAccess = requiredRoles
    ? groups.some((group) => requiredRoles.includes(group.name))
    : true

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  if (!hasRequiredAccess || hasExcludedRole) {
    return <Navigate to="/" />
  }

  return <WebSocketProvider>{children}</WebSocketProvider>
}
