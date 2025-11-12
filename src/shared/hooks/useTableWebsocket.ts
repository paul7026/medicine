/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react'

import { useWebSocketContext } from '@app/providers/WebSocketProvider'

import { isObjectEmpty } from '@shared/helpers/isObjectEmpty'

import { useAppDispatch } from './useAppDispatch'

interface UseTableWebsocketParams<T> {
  resource: string
  queryParams: string
  endpoint: any
  updateAction: (entity: T) => any
}

export const useTableWebsocket = <T>({
  resource,
  queryParams,
  endpoint,
  updateAction,
}: UseTableWebsocketParams<T>) => {
  const { lastMessage, connectionStatus, sendMessage } = useWebSocketContext()
  const dispatch = useAppDispatch()
  const queryParamsRef = useRef(queryParams)
  const deleteTimeoutRef = useRef<number | null>(null)

  queryParamsRef.current = queryParams

  const handleWebSocketMessage = useCallback(
    (message: any) => {
      const { event, object: entity } = message

      switch (event) {
        case 'CREATED':
          if (!isObjectEmpty(entity)) {
            dispatch(endpoint(queryParamsRef.current))
          }
          break

        case 'UPDATED':
          if (!isObjectEmpty(entity)) {
            dispatch(updateAction(entity))
          }
          break

        case 'DELETED':
          // Clear previous timeout to batch rapid deletions
          if (deleteTimeoutRef.current !== null) {
            window.clearTimeout(deleteTimeoutRef.current)
          }
          // Set a new timeout to dispatch after 100ms of inactivity
          deleteTimeoutRef.current = window.setTimeout(() => {
            dispatch(endpoint(queryParamsRef.current))
            deleteTimeoutRef.current = null
          }, 100)
          break

        default:
          console.warn(`Unhandled event type: ${event}`)
      }
    },
    [dispatch, updateAction, endpoint]
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current !== null) {
        window.clearTimeout(deleteTimeoutRef.current)
      }
    }
  }, [])

  // Manage WebSocket connection
  useEffect(() => {
    if (connectionStatus !== 'Open') return

    sendMessage(`add ${resource}`)

    return () => {
      sendMessage(`delete ${resource}`)
    }
  }, [connectionStatus, sendMessage, resource])

  useEffect(() => {
    if (!lastMessage) return

    const message = JSON.parse(lastMessage.data)
    const isValidMessage =
      message &&
      message.object &&
      message.resource === resource &&
      message.event

    if (!isValidMessage) return

    handleWebSocketMessage(message)
  }, [lastMessage, resource, handleWebSocketMessage])
}
