import DownloadIcon from '@mui/icons-material/Download'

import { Button } from '@shared/ui/Button'

interface DownloadBtnProps {
  downloadFn: () => Promise<{ download_url: string }>
}

export const DownloadBtn = ({ downloadFn }: DownloadBtnProps) => {
  // const { addErrorMessage } = useSystemMessage()

  const downloadHandler = async () => {
    try {
      const { download_url } = await downloadFn()

      const origin = window.location.origin
      const fullDownloadUrl = `${origin}${download_url}`

      const link = document.createElement('a')
      link.href = fullDownloadUrl
      link.setAttribute('download', '')
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.log(err)
      // addErrorMessage(err as [])
    }
  }

  return (
    <Button
      endIcon={<DownloadIcon />}
      variant="outlined"
      onClick={downloadHandler}
    >
      Скачать
    </Button>
  )
}
