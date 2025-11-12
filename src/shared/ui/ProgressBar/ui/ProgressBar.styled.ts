import { styled } from '@mui/material/styles'

export const Element = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: 26,
  borderRadius: 2,
}))

export const Value = styled('div')({
  position: 'absolute',
  lineHeight: '24px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
})

export const Bar = styled('div')({
  height: '100%',
  '&.low': {
    backgroundColor: '#088208a3',
  },
  '&.medium': {
    backgroundColor: '#efbb5aa3',
  },
  '&.high': {
    backgroundColor: '#f44336',
  },
})
