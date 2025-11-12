import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Meta, StoryObj } from '@storybook/react'

import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'UI-Kit/DatePicker',
  component: DatePicker,
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

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}
