import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

type ExportChatButtonProps = {
  chatId: string
}

export const ExportChatButton = ({ chatId }: ExportChatButtonProps) => {
  const [exportModalOpen, setExportModalOpen] = useState(false)

  const handleExportClick = () => {
    setExportModalOpen(true)
  }

  const handleExportClose = () => {
    setExportModalOpen(false)
  }

  const handleExportPdf = () => {
    // TODO: Implement PDF export
    console.log('Exporting to PDF for chat:', chatId)
    setExportModalOpen(false)
  }

  const handleExportExcel = () => {
    // TODO: Implement Excel export
    console.log('Exporting to Excel for chat:', chatId)
    setExportModalOpen(false)
  }

  return (
    <>
      <Button variant="contained" onClick={handleExportClick}>
        Export
      </Button>

      <Modal
        withoutActionButtons
        open={exportModalOpen}
        title="Export chat"
        onClose={handleExportClose}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button fullWidth variant="contained" onClick={handleExportPdf}>
            Export as PDF
          </Button>
          <Button fullWidth variant="contained" onClick={handleExportExcel}>
            Export as Excel
          </Button>
        </Box>
      </Modal>
    </>
  )
}
