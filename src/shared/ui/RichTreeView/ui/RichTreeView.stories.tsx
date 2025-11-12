import { TreeViewBaseItem } from '@mui/x-tree-view/models'
import { Meta, StoryObj } from '@storybook/react'

import { RichTreeView } from './RichTreeView'

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: 'grid',
    label: 'Data Grid',
    children: [
      { id: 'grid-community', label: '@mui/x-data-grid' },
      { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
      { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
    ],
  },
  {
    id: 'pickers',
    label: 'Date and Time Pickers',
    children: [
      { id: 'pickers-community', label: '@mui/x-date-pickers' },
      { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    children: [{ id: 'charts-community', label: '@mui/x-charts' }],
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    children: [{ id: 'tree-view-community', label: '@mui/x-tree-view' }],
  },
]

const meta: Meta<typeof RichTreeView> = {
  title: 'UI-Kit/RichTreeView',
  component: RichTreeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof RichTreeView>

export const Default: Story = {
  args: {
    items: MUI_X_PRODUCTS,
    sx: { minHeight: 352, minWidth: 250 },
  },
}
