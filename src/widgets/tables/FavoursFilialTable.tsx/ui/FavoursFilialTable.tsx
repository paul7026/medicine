import { useEffect, useState } from 'react'

import { filialsSelector, getFilialsApi } from '@entities/filials'

import { AffiliateModalData } from '@widgets/AffiliateModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

interface FavoursFilialTableProps {
  favourId: string
}

export const FavoursFilialTable = ({ favourId }: FavoursFilialTableProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFilialId, setSelectedFilialId] = useState<string | null>(null)

  const { filials, status } = useAppSelector(filialsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!favourId) return
    dispatch(getFilialsApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  const handleNameClick = (id: string) => {
    setSelectedFilialId(id)
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
          rows={filials}
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={modalOpen}
        title="Filial"
        onClose={() => {
          setModalOpen(false)
          setSelectedFilialId(null)
        }}
      >
        {selectedFilialId && <AffiliateModalData filialId={selectedFilialId} />}
      </Modal>
    </>
  )
}
