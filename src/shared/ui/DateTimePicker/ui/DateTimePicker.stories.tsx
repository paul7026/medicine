import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Meta, StoryObj } from '@storybook/react'

import { DateTimePicker } from './DateTimePicker'

const meta: Meta<typeof DateTimePicker> = {
  title: 'UI-Kit/DateTimePicker',
  component: DateTimePicker,
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

type Story = StoryObj<typeof DateTimePicker>

export const Default: Story = {}
