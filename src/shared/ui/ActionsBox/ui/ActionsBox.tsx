import RefreshIcon from '@mui/icons-material/Refresh'

import { useEffect } from 'react'

import { setInitialTableSearch, setTableSearch } from '@entities/table'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { SearchInput } from '@shared/ui/SearchInput'

import { ActionsBoxProps } from '../model/types'

export const ActionsBox = ({
  actionBtns,
  children,
  onRefresh,
  withoutSearch = false,
}: ActionsBoxProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(setInitialTableSearch())
    }
  }, [dispatch])

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 1 }}
    >
      <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
        {onRefresh && (
          <Button variant="outlined" onClick={onRefresh}>
            <RefreshIcon />
          </Button>
        )}

        {actionBtns &&
          actionBtns.map((action) => (
            <Button
              key={action.id}
              disabled={action.disable}
              endIcon={action.icon}
              variant="outlined"
              onClick={action.onClick}
            >
              {action.title}
            </Button>
          ))}

        {children}
      </Box>

      {!withoutSearch && (
        <SearchInput
          sx={{ minWidth: 250 }}
          onChange={(search) => dispatch(setTableSearch(search))}
        />
      )}
    </Box>
  )
}
