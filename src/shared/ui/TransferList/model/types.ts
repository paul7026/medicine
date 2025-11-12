export interface TransferListItem {
  id: string
  label: string
  icon?: string
}

export interface TransferListProps {
  items: {
    left: TransferListItem[]
    right: TransferListItem[]
  }

  leftTitle: string
  rightTitle: string
  listHeight?: string
  onChange: (items: {
    left: TransferListItem[]
    right: TransferListItem[]
  }) => void
}
