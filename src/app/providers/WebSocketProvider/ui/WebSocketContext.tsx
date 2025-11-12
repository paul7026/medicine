import { createContext } from 'react'

import { WebSocketContextValue } from '../model/types'

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
)
