import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
} from '@mui/material'

import { MouseEvent } from 'react'

import { Button } from '@shared/ui/Button'
import { Icon } from '@shared/ui/Icon'
import { IconButton } from '@shared/ui/IconButton'

export type ModalProps = DialogProps & {
  okText?: string
  cancelText?: string
  formId?: string
  withoutActionButtons?: boolean
  withoutCancelButton?: boolean
  okButton?: React.ReactElement
  onOk?: () => void
  icon?: string
}

export const Modal = ({
  children,
  title,
  onClose,
  onOk,
  okText,
  cancelText,
  formId,
  withoutActionButtons = false,
  withoutCancelButton = false,
  okButton,
  icon,
  ...props
}: ModalProps) => {
  const modalCloseHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose(event, 'escapeKeyDown')
    }
  }

  const modalSubmitHandler = () => {
    if (onOk) {
      onOk()
    }
  }

  return (
    <Dialog
      {...props}
      fullWidth
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && onClose) {
          onClose(event, reason)
        }
      }}
    >
      <IconButton
        sx={{ position: 'absolute', right: 14, top: 13 }}
        onClick={modalCloseHandler}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{ mr: 2, display: icon ? 'flex' : 'block', alignItems: 'center' }}
      >
        {icon && <Icon sx={{ mr: 1 }}>{icon}</Icon>}
        {title}
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 2 }}>{children}</DialogContent>

      {!withoutActionButtons && (
        <DialogActions>
          {!withoutCancelButton && (
            <Button onClick={modalCloseHandler}>
              {cancelText ? cancelText : 'Cancel'}
            </Button>
          )}
          {okButton ? (
            okButton
          ) : (
            <Button
              autoFocus
              form={formId}
              type={formId ? 'submit' : 'button'}
              variant="contained"
              onClick={modalSubmitHandler}
            >
              {okText ? okText : 'Submit'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}
