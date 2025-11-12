import BookmarksIcon from '@mui/icons-material/Bookmarks'

import { Box } from '@shared/ui/Box'
import { Icon } from '@shared/ui/Icon'
import { Link } from '@shared/ui/Link'

import { RenderCellParams } from '../types'

export const renderNameWithTags = (
  params: RenderCellParams,
  iconName: string,
  path?: string
) => {
  const { id, value } = params

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon color="inherit" sx={{ mr: 1 }}>
          {iconName}
        </Icon>
        <Link color="inherit" href={path ? `/${path}/${id}` : `${id}`}>
          {value.verbose_name}
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {value.tags &&
          value.tags.map((tag: { verbose_name: string; colour: string }) => (
            <BookmarksIcon key={tag.verbose_name} sx={{ color: tag.colour }} />
          ))}
      </Box>
    </Box>
  )
}
