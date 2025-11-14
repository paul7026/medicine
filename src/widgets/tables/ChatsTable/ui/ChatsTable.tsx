import { useState } from 'react'

import { ChatModalData } from '@widgets/ChatModalData'

import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

type ChatRow = {
  id: string
  clinic_name: string
  prettify_name: string
}

const mockChats: ChatRow[] = [
  {
    id: '1',
    clinic_name: 'Clinic A',
    prettify_name: 'Chat #1',
  },
  {
    id: '2',
    clinic_name: 'Clinic B',
    prettify_name: 'Chat #2',
  },
  {
    id: '3',
    clinic_name: 'Clinic C',
    prettify_name: 'Chat #3',
  },
]

export const ChatsTable = () => {
  const [rows] = useState(mockChats)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [chat, setChat] = useState<ChatRow | null>(null)

  const handleEdit = (chat: ChatRow) => {
    setChat(chat)
    setEditIsOpen(true)
  }

  const handleView = (chat: ChatRow) => {
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
        loading={false}
        rows={rows}
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
