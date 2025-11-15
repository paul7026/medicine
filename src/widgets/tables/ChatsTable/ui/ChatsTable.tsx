import { useEffect, useState } from 'react'

import { Chat, chatsSelector, getChatsApi } from '@entities/chats'

import { ChatModalData } from '@widgets/ChatModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

export const ChatsTable = () => {
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [chat, setChat] = useState<Chat | null>(null)

  const { status, chats } = useAppSelector(chatsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChatsApi())
  }, [dispatch])

  const handleEdit = (chat: Chat) => {
    setChat(chat)
    setEditIsOpen(true)
  }

  const handleView = (chat: Chat) => {
    setChat(chat)
    setViewIsOpen(true)
  }

  const handleClose = () => {
    setEditIsOpen(false)
    setViewIsOpen(false)
    setChat(null)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleEdit, handleView)}
        loading={status === 'pending'}
        rows={chats}
      />

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a chat"
        onClose={handleClose}
      >
        {chat && (
          <div>{/* Edit form will be added here for chat: {chat.id} */}</div>
        )}
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="xl"
        open={viewIsOpen}
        title="Chat"
        onClose={handleClose}
      >
        {chat && <ChatModalData chatId={chat.id} />}
      </Modal>
    </>
  )
}
