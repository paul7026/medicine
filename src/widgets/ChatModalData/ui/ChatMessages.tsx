import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material'

import { useState } from 'react'

import { formatIsoString } from '@shared/helpers/formatIsoString'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: string
  meta?: {
    type: string
    [key: string]: unknown
  }
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello, I need help with booking an appointment Hello, I need help with booking an appointment',
    sender: 'user',
    timestamp: '2025-01-14T12:00:00.000Z',
  },
  {
    id: '2',
    text: 'Hello! I can help you with that. What type of appointment do you need?',
    sender: 'bot',
    timestamp: '2025-01-14T12:00:05.000Z',
  },
  {
    id: '3',
    text: 'I need a consultation I need a consultation',
    sender: 'user',
    timestamp: '2025-01-14T12:01:00.000Z',
    meta: {
      type: 'intent',
      intent: 'booking',
      confidence: 0.95,
      entities: ['consultation'],
    },
  },
  {
    id: '4',
    text: 'Sure! I can help you book a consultation. What date would work for you?',
    sender: 'bot',
    timestamp: '2025-01-14T12:01:30.000Z',
  },
]

export const ChatMessages = () => {
  const [expandedMeta, setExpandedMeta] = useState<Set<string>>(new Set())

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
        {mockMessages.map((message) => {
          const isUser = message.sender === 'user'
          const hasMeta = !!message.meta
          const isMetaExpanded = expandedMeta.has(message.id)

          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <Card
                  sx={{
                    backgroundColor: isUser ? '#1976d2' : '#f5f5f5',
                    color: isUser ? '#fff' : '#000',
                  }}
                >
                  <CardContent sx={{ pb: hasMeta ? 1 : '16px !important' }}>
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography
                      sx={{
                        display: 'block',
                        mt: 1,
                        opacity: 0.7,
                        fontSize: '0.75rem',
                      }}
                      variant="caption"
                    >
                      {formatIsoString(message.timestamp)}
                    </Typography>
                  </CardContent>
                </Card>

                {hasMeta && (
                  <>
                    <IconButton
                      size="small"
                      sx={{ mt: 0.5, alignSelf: 'flex-start' }}
                      onClick={() => toggleMeta(message.id)}
                    >
                      {isMetaExpanded ? (
                        <ExpandLessIcon fontSize="small" />
                      ) : (
                        <ExpandMoreIcon fontSize="small" />
                      )}
                    </IconButton>

                    <Collapse in={isMetaExpanded}>
                      <Card
                        sx={{
                          mt: 1,
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
                  </>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
