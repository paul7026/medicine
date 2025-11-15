import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { CreateFavourCategoryForm } from '@features/forms/CreateFavourCategoryForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const FavourCategoriesActions = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        mb: 4,
      }}
    >
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add favour categories
      </Button>
      <Modal
        formId="create-favour-category-form"
        open={open}
        title="Create new favour category"
        onClose={handleClose}
      >
        <CreateFavourCategoryForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
