import { ReactNode } from 'react'
import { WebSocketHook } from 'react-use-websocket/dist/lib/types'

export interface WebSocketProviderProps {
  children: ReactNode
}

export interface WebSocketContextValue extends WebSocketHook {
  connectionStatus: string
}
