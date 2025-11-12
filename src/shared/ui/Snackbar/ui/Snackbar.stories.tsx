import { Meta, StoryObj } from '@storybook/react'

import { Snackbar } from './Snackbar'

const meta: Meta<typeof Snackbar> = {
  title: 'UI-Kit/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Snackbar>

export const Success: Story = {
  args: {
    severity: 'success',
  },
}

export const Info: Story = {
  args: {
    severity: 'info',
  },
}

export const Warning: Story = {
  args: {
    severity: 'warning',
  },
}

export const Error: Story = {
  args: {
    severity: 'error',
    message:
      'Long error message, long error message, long error message,  long error message, long error message',
  },
}
