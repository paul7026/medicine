import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded'

export const ExpandIconConnectionBorder = (
  props: React.PropsWithoutRef<typeof AddBoxRoundedIcon>
) => {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />
}

export const CollapseIconConnectionBorder = (
  props: React.PropsWithoutRef<typeof IndeterminateCheckBoxRoundedIcon>
) => {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />
}

export const EndIconConnectionBorder = (
  props: React.PropsWithoutRef<typeof DisabledByDefaultRoundedIcon>
) => {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />
}
