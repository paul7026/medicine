import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Meta, StoryObj } from '@storybook/react'

import { TimePicker } from './TimePicker'

const meta: Meta<typeof TimePicker> = {
  title: 'UI-Kit/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TimePicker>

export const Default: Story = {}
