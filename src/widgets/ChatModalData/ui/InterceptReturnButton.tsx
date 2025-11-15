import { useState } from 'react'

import { interceptChatApi } from '@entities/chats/api/interceptChatApi'
import { returnChatApi } from '@entities/chats/api/returnChatApi'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'

import { InterceptReturnButtonProps } from '../model/types'

export const InterceptReturnButton = ({
  chatId,
  currentIntent,
}: InterceptReturnButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const isReturn = currentIntent === 0

  const handleClick = () => {
    if (isReturn) {
      handleReturn()
    } else {
      handleIntercept()
    }
  }

  const handleIntercept = () => {
    setIsLoading(true)

    dispatch(interceptChatApi(chatId))
      .unwrap()
      .then(() => {
        addSuccessMessage('Chat intercepted successfully')
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  const handleReturn = () => {
    setIsLoading(true)

    dispatch(returnChatApi(chatId))
      .unwrap()
      .then(() => {
        addSuccessMessage('Chat returned successfully')
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <Button disabled={isLoading} variant="contained" onClick={handleClick}>
      {isReturn ? 'Return' : 'Intercept'}
    </Button>
  )
}
