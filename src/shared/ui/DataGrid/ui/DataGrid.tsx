import EditIcon from '@mui/icons-material/Edit'
import { Link, Tooltip } from '@mui/material'

import { Box } from '@shared/ui/Box'
import { IconButton } from '@shared/ui/IconButton'
import { Typography } from '@shared/ui/Typography'

import { DataGridProps } from '../model/types'

export const DataGrid = ({
  data,
  sx,
  dense,
  subtitleMaxWidth,
  wordBreakOff = false,
}: DataGridProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: dense ? '1fr' : '1fr 1fr',
        gap: dense ? 1 : 2,
        '@media (max-width: 1100px)': {
          gridTemplateColumns: '1fr',
        },
        ...sx,
      }}
    >
      {data.map((item) => (
        <Box
          key={item.id ? item.id : item.title}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            minHeight: dense ? '53px' : '60px',
            borderBottom: '0.9px solid rgba(0, 0, 0, 0.12)',
            borderTop: '0.9px solid rgba(0, 0, 0, 0.12)',
            columnGap: 2,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.renderAdditionalBtn && item.renderAdditionalBtn}

            {item.onClick && (
              <IconButton
                size="small"
                sx={{ mr: 1 }}
                tooltipTitle={item.tooltipTitle}
                onClick={item.onClick}
              >
                <EditIcon />
              </IconButton>
            )}

            <Tooltip
              title={
                typeof item.subtitle === 'string' ||
                typeof item.subtitle === 'number'
                  ? item.subtitle
                  : ''
              }
            >
              {item.link ? (
                <Link
                  href={item.link}
                  sx={{
                    wordBreak: 'break-all',
                    maxWidth: subtitleMaxWidth,
                    display: 'inline-block',
                  }}
                >
                  {item.subtitle ?? '--'}
                </Link>
              ) : (
                <Typography
                  noWrap={item.noWrap}
                  sx={{
                    maxWidth: subtitleMaxWidth,
                    wordBreak: `${wordBreakOff ? 'normal' : 'break-all'}`,
                  }}
                >
                  {item.subtitle ?? '--'}
                </Typography>
              )}
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
