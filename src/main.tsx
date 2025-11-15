import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/ru'
import { createRoot } from 'react-dom/client'

import App from '@app/App'
import { ErrorBoundary } from '@app/providers/ErrorBoundary'
import { SnackbarCustomProvider } from '@app/providers/SnackbarCustomProvider'
import { StoreProvider } from '@app/providers/StoreProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <StoreProvider>
      <ThemeProvider>
        <LocalizationProvider adapterLocale="en" dateAdapter={AdapterDayjs}>
          <SnackbarCustomProvider>
            <App />
          </SnackbarCustomProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StoreProvider>
  </ErrorBoundary>
)
