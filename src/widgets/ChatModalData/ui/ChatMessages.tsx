import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'

import { useCallback, useEffect, useState } from 'react'

import { chatHistorySelector, getChatHistoryApi } from '@entities/chats'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useInterval } from '@shared/hooks/useInterval'
import { CircularProgress } from '@shared/ui/CircularProgress'

import { getBackgroundColor, getTextColor } from '../model/helpers'

interface ChatMessagesProps {
  chatId: string
  sx?: SxProps<Theme>
}

export const ChatMessages = ({ chatId, sx }: ChatMessagesProps) => {
  const { status, chatHistory } = useAppSelector(chatHistorySelector)

  const dispatch = useAppDispatch()

  const [expandedMeta, setExpandedMeta] = useState<Set<string>>(new Set())

  const fetchChatHistory = useCallback(() => {
    dispatch(getChatHistoryApi(chatId))
  }, [dispatch, chatId])

  useEffect(() => {
    fetchChatHistory()
  }, [fetchChatHistory])

  useInterval(fetchChatHistory, 3 * 60 * 1000)

  const toggleMeta = (messageId: string) => {
    setExpandedMeta((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }

      return newSet
    })
  }

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6">Messages</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: 500,
          overflowY: 'auto',
          p: 2,
        }}
      >
        {status === 'pending' && chatHistory && chatHistory.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {chatHistory &&
          chatHistory.length > 0 &&
          chatHistory.map((message) => {
            const isUser = message.role === 'user'
            const hasMeta = !!message.meta
            const isMetaExpanded = expandedMeta.has(message.id)

            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-start' : 'flex-end',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-start' : 'flex-end',
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: getBackgroundColor(message),
                      color: getTextColor(message),
                      position: 'relative',
                    }}
                  >
                    <CardContent sx={{ pb: hasMeta ? 1 : '16px !important' }}>
                      <Typography variant="body1">{message.message}</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mt: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            display: 'block',
                            opacity: 0.7,
                          }}
                          variant="caption"
                        >
                          {formatIsoString(message.created_at)}
                        </Typography>
                      </Box>
                    </CardContent>

                    {hasMeta && (
                      <IconButton
                        color="inherit"
                        size="small"
                        sx={{
                          position: 'absolute',
                          right: 8,
                          bottom: 8,
                          opacity: 0.7,
                          '&:hover': {
                            opacity: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                        onClick={() => toggleMeta(message.id)}
                      >
                        {isMetaExpanded ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </IconButton>
                    )}
                  </Card>

                  {hasMeta && (
                    <Collapse in={isMetaExpanded}>
                      <Card
                        sx={{
                          border: '1px solid #e0e0e0',
                          maxWidth: '100%',
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ mb: 1 }} variant="subtitle2">
                            Meta (JSON):
                          </Typography>
                          <Box
                            component="pre"
                            sx={{
                              fontSize: '0.75rem',
                              margin: 0,
                              overflow: 'auto',
                              backgroundColor: '#f5f5f5',
                              p: 1,
                              borderRadius: 1,
                            }}
                          >
                            {JSON.stringify(message.meta, null, 2)}
                          </Box>
                        </CardContent>
                      </Card>
                    </Collapse>
                  )}
                </Box>
              </Box>
            )
          })}
        {status === 'succeeded' && chatHistory && chatHistory.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              color: 'text.secondary',
            }}
          >
            <Typography>No messages yet</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
