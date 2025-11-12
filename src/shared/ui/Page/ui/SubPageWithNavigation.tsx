import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { getLastPartOfUrl } from '@shared/helpers/getLastPartOfUrl'
import { Box } from '@shared/ui/Box'
import { Card } from '@shared/ui/Card'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { List } from '@shared/ui/List'

import { SubPageWithNavigationProps } from '../model/types'

export const SubPageWithNavigation = ({
  navListItems,
}: SubPageWithNavigationProps) => {
  const { pathname } = useLocation()

  const [selectedListIndex, setSelectedListIndex] = useState<string | null>(
    null
  )

  useEffect(() => {
    setSelectedListIndex(getLastPartOfUrl(pathname))
  }, [pathname])

  return (
    <Box
      id="sub-page-with-nav"
      sx={{
        display: 'grid',
        gridTemplateColumns: '255px 1fr',
        columnGap: 1.5,
        overflowY: 'hidden',
        flex: 1,
        mb: 1,
      }}
    >
      <Card
        sx={{
          overflowY: 'auto',
          m: 0.1,
          '.MuiCardContent-root': {
            p: 0,
          },
        }}
      >
        <List
          withNavigation
          listItems={navListItems}
          selectedIndex={selectedListIndex}
        />
      </Card>

      <Card
        cardContentProps={{
          sx: {
            height: '100%',
            width: '100%',
          },
        }}
        sx={{
          overflowY: 'auto',
          m: 0.1,
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </Card>
    </Box>
  )
}
