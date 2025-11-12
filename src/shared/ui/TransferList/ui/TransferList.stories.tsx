import { Meta, StoryObj } from '@storybook/react'

import { TransferList } from './TransferList'

const meta: Meta<typeof TransferList> = {
  title: 'UI-Kit/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof TransferList>

export const Default: Story = {
  args: {
    items: {
      left: [
        { id: '1', label: 'Apple' },
        { id: '2', label: 'Banana' },
      ],
      right: [
        { id: '3', label: 'Orange' },
        { id: '4', label: 'Peach' },
      ],
    },
    leftTitle: 'Choices',
    rightTitle: 'Chosen',
  },
}
