import { Link as LinkMui, LinkProps } from '@mui/material'

import { Link as ReactRouterLink } from 'react-router-dom'

export const Link = ({
  href,
  component = ReactRouterLink,
  ...props
}: LinkProps) => {
  return <LinkMui {...props} component={component} to={href ?? '#'} />
}
