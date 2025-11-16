import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteFavourCategoryApi,
  favourCategoriesSelector,
  getFavourCategoriesApi,
} from '@entities/favourCategory'

import { CreateFavourCategoryForm } from '@features/forms/CreateFavourCategoryForm'

import { FavourCategoriesModalData } from '@widgets/FavourCategoriesModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const FavourCategoriesTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, favourCategories } = useAppSelector(favourCategoriesSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getFavourCategoriesApi())
  }, [dispatch])

  const handleClickDelete = (id: GridRowId) => {
    setId(id)
    setDeleteIsOpen(true)
  }

  const handleEdit = (id: GridRowId) => {
    setId(id)
    setEditIsOpen(true)
  }

  const handleClose = () => {
    setId(null)
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setViewIsOpen(false)
  }

  const handleDelete = () => {
    if (!id) {
      return
    }

    dispatch(deleteFavourCategoryApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Favour category deleted')
        dispatch(getFavourCategoriesApi())
      })
      .catch((err) => addErrorMessage(err))
  }

  const handleView = (id: GridRowId) => {
    setId(id)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleEdit, handleView)}
        loading={status === 'pending'}
        rows={favourCategories}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a favour category"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the favour category with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-favour-category-form"
        open={editIsOpen}
        title="Editing an favour categories"
        onClose={handleClose}
      >
        <CreateFavourCategoryForm categoryId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-favour-category-form"
        open={viewIsOpen}
        title="Favour Categories"
        onClose={handleClose}
      >
        {id && <FavourCategoriesModalData categoryId={id as string} />}
      </Modal>
    </>
  )
}
