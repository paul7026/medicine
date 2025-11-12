import { Meta, StoryObj } from '@storybook/react'

import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'UI-Kit/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {},
}

export const EmptySearch: Story = {
  args: {
    onChange: (data: string) => {
      console.log('Submitted data:', data)
    },
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
}
