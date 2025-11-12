import { Meta, StoryObj } from '@storybook/react'

import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'UI-Kit/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    title: 'Success',
    subtitle: 'This is a success Alert with an encouraging title.',
    severity: 'success',
  },
}

export const Info: Story = {
  args: {
    title: 'Info',
    subtitle: 'This is an info Alert with an informative title.',
    severity: 'info',
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning',
    subtitle: 'This is a warning Alert with a cautious title.',
    severity: 'warning',
  },
}

export const Error: Story = {
  args: {
    title: 'Error',
    subtitle: 'This is an error Alert with a scary title.',
    severity: 'error',
  },
}
