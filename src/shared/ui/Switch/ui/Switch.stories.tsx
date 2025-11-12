import { FormGroup } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'

import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'UI-Kit/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  render: (args) => (
    <FormGroup>
      <Switch label="Label" {...args} />
      <Switch label="DefaultChecked" {...args} defaultChecked />
      <Switch label="Required" {...args} required />
      <Switch label="Disabled" {...args} disabled />
    </FormGroup>
  ),
}

export default meta

type Story = StoryObj<typeof Switch>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { color: 'secondary' },
}

export const Error: Story = {
  args: { color: 'error' },
}

export const Success: Story = {
  args: {
    color: 'success',
  },
}

export const Warning: Story = {
  args: {
    color: 'warning',
  },
}

export const Info: Story = {
  args: {
    color: 'info',
  },
}
