import { Grid2 } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Icon } from '@shared/ui/Icon'

import { TransferListItem, TransferListProps } from '../model/types'

export const TransferList = ({
  items,
  leftTitle,
  rightTitle,
  listHeight,
  onChange,
}: TransferListProps) => {
  const [checked, setChecked] = useState<string[]>([])

  const isChecked = (id: string) => checked.includes(id)

  const handleToggle = (id: string) => () => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleToggleAll = (items: TransferListItem[]) => () => {
    const allSelected = items.every((item) => checked.includes(item.id))
    const newChecked = allSelected
      ? checked.filter((id) => !items.some((item) => item.id === id))
      : [
          ...checked,
          ...items.map((item) => item.id).filter((id) => !checked.includes(id)),
        ]
    setChecked(newChecked)
  }

  const moveItems = (
    source: TransferListItem[],
    target: TransferListItem[],
    sourceKey: 'left' | 'right'
  ) => {
    const selected = source.filter((item) => checked.includes(item.id))
    const updatedSource = source.filter((item) => !checked.includes(item.id))
    const updatedTarget = [...target, ...selected]
    setChecked((prev) =>
      prev.filter((id) => !selected.some((item) => item.id === id))
    )

    const updatedItems =
      sourceKey === 'left'
        ? { left: updatedSource, right: updatedTarget }
        : { left: updatedTarget, right: updatedSource }

    onChange(updatedItems)
  }

  const numberOfChecked = (items: TransferListItem[]) =>
    items.filter((item) => checked.includes(item.id)).length

  const customList = (title: string, items: TransferListItem[]) => (
    <Card>
      <CardHeader
        avatar={
          <Checkbox
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            disabled={items.length === 0}
            indeterminate={
              numberOfChecked(items) > 0 &&
              numberOfChecked(items) < items.length
            }
            onClick={handleToggleAll(items)}
          />
        }
        subheader={`${numberOfChecked(items)}/${items.length} выбрано`}
        sx={{ px: 2, py: 1 }}
        title={title}
      />
      <Divider />
      <List
        dense
        role="list"
        sx={{
          height: listHeight ?? 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
      >
        {items.map((item) => (
          <ListItemButton key={item.id} onClick={handleToggle(item.id)}>
            <ListItemIcon>
              <Checkbox
                disableRipple
                checked={isChecked(item.id)}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Icon>{item.icon}</Icon>
                  {item.label}
                </Box>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Card>
  )

  return (
    <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
      <Grid2>{customList(leftTitle, items.left)}</Grid2>
      <Grid2>
        <Grid2 container direction="column" sx={{ alignItems: 'center' }}>
          <Button
            disabled={items.left.every((item) => !checked.includes(item.id))}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
            onClick={() => moveItems(items.left, items.right, 'left')}
          >
            &gt;
          </Button>
          <Button
            disabled={items.right.every((item) => !checked.includes(item.id))}
            size="small"
            sx={{ my: 0.5 }}
            variant="outlined"
            onClick={() => moveItems(items.right, items.left, 'right')}
          >
            &lt;
          </Button>
        </Grid2>
      </Grid2>
      <Grid2>{customList(rightTitle, items.right)}</Grid2>
    </Grid2>
  )
}
