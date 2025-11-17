import { useEffect, useState } from 'react'

import { favoursSelector, getFavoursApi } from '@entities/favours'

import { FavourModalData } from '@widgets/FavourModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

interface FilialFavoursTableProps {
  filialId: string
}

export const FilialFavoursTable = ({ filialId }: FilialFavoursTableProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFavourId, setSelectedFavourId] = useState<string | null>(null)

  const { favours, status } = useAppSelector(favoursSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!filialId) return
    dispatch(getFavoursApi(`filial_id=${filialId}`))
  }, [dispatch, filialId])

  const handleNameClick = (id: string) => {
    setSelectedFavourId(id)
    setModalOpen(true)
  }

  return (
    <>
      <Box sx={{ height: 300 }}>
        <Table
          hideFooter
          isSingleSelection
          columns={getColumns(handleNameClick)}
          loading={status === 'pending'}
          rows={favours}
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={modalOpen}
        title="Favour"
        onClose={() => {
          setModalOpen(false)
          setSelectedFavourId(null)
        }}
      >
        {selectedFavourId && <FavourModalData favourId={selectedFavourId} />}
      </Modal>
    </>
  )
}
