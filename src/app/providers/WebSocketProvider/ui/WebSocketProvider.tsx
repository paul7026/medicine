import { useMemo } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { cookies } from '@shared/http/cookies'

import { WebSocketContext } from './WebSocketContext'

import { getWsUrl } from '../model/helpers'
import { WebSocketProviderProps } from '../model/types'

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const token = cookies.get('token')

  const shouldConnect = Boolean(token)

  const wsUrl = useMemo(
    () => (shouldConnect ? getWsUrl(token) : null),
    [shouldConnect, token]
  )

  const { readyState, ...otherParams } = useWebSocket(wsUrl, {
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  return (
    <WebSocketContext.Provider
      value={{ connectionStatus, readyState, ...otherParams }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}
