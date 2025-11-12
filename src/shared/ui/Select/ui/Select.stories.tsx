import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'UI-Kit/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    selectItems: [
      { id: '0', name: 'value 1', value: 'value1' },
      { id: '1', name: 'value 2', value: 'value2' },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
  },
}

export const Multiple: Story = {
  args: {
    selectItems: [
      {
        id: '0',
        name: 'value 1',
        value: 'value1',
        subText: 'sub text',
      },
      { id: '1', name: 'value 2', value: 'value2' },
      { id: '2', name: 'value 3', value: 'value3' },
      { id: '3', name: 'value 4', value: 'value4' },
      { id: '4', name: 'value 5', value: 'value5' },
      { id: '5', name: 'value 6', value: 'value6' },
      { id: '6', name: 'value 7', value: 'value7' },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
    multiple: true,
    defaultValue: [],
  },
}

export const WithSubText: Story = {
  args: {
    selectItems: [
      { id: '0', name: 'value 1', value: 'value1', subText: 'sub text' },
      { id: '1', name: 'value 2', value: 'value2', subText: 'sub text' },
      { id: '2', name: 'value 3', value: 'value3', subText: 'sub text' },
      { id: '3', name: 'value 4', value: 'value4', subText: 'sub text' },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
  },
}

export const WitIcon: Story = {
  args: {
    selectItems: [
      {
        id: '0',
        name: 'value 1',
        value: 'value1',
        icon: <AddCircleIcon />,
      },
      { id: '1', name: 'value 2', value: 'value2', icon: <AddCircleIcon /> },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
  },
}

export const WithSubTextAndIcon: Story = {
  args: {
    selectItems: [
      {
        id: '0',
        name: 'value 1',
        value: 'value1',
        subText: 'sub text',
        icon: <AddCircleIcon />,
      },
      {
        id: '1',
        name: 'value 2',
        value: 'value2',
        subText: 'sub text',
        icon: <AddCircleIcon />,
      },
      {
        id: '2',
        name: 'value 3',
        value: 'value3',
        subText: 'sub text',
        icon: <AddCircleIcon />,
      },
      {
        id: '3',
        name: 'value 4',
        value: 'value4',
        subText: 'sub text',
        icon: <AddCircleIcon />,
      },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
  },
}

export const Disabled: Story = {
  args: {
    selectItems: [
      { id: '0', name: 'value 1', value: 'value1' },
      { id: '1', name: 'value 2', value: 'value2' },
    ],
    sx: {
      width: '300px',
    },
    disabled: true,
    label: 'Select',
  },
}

export const Error: Story = {
  args: {
    selectItems: [
      { id: '0', name: 'value 1', value: 'value1' },
      { id: '1', name: 'value 2', value: 'value2' },
    ],
    sx: {
      width: '300px',
    },
    label: 'Select',
    error: true,
    errorMessage: 'Error message',
  },
}
