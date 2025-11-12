import { Breadcrumbs as BreadcrumbsMui } from '@mui/material'

import { Icon } from '@shared/ui/Icon'
import { Link } from '@shared/ui/Link'
import { Typography } from '@shared/ui/Typography'

import { BreadcrumbsProps } from '../model/types'

export const Breadcrumbs = ({
  breadcrumbsList,
  ...props
}: BreadcrumbsProps) => {
  return (
    <BreadcrumbsMui {...props}>
      {breadcrumbsList.map(({ id, href, icon, name }) => {
        if (!href) {
          return (
            <Typography
              key={id}
              sx={{
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                fontSize: 'inherit',
              }}
            >
              {icon && (
                <Icon fontSize="inherit" sx={{ mr: 0.5 }}>
                  {icon}
                </Icon>
              )}
              {name}
            </Typography>
          )
        }

        return (
          <Link
            key={id}
            color="inherit"
            href={href}
            sx={{ display: 'flex', alignItems: 'center', fontSize: 'inherit' }}
            underline="hover"
          >
            {icon && (
              <Icon fontSize="inherit" sx={{ mr: 0.5 }}>
                {icon}
              </Icon>
            )}
            {name}
          </Link>
        )
      })}
    </BreadcrumbsMui>
  )
}
