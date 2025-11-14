import EditIcon from '@mui/icons-material/Edit'
import UndoIcon from '@mui/icons-material/Undo'

import { useEffect, useState } from 'react'

import {
  editPromptApi,
  getPromptByIdApi,
  promptByIdSelector,
  updatePromptContent,
} from '@entities/prompts'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { IconButton } from '@shared/ui/IconButton'
import { TextField } from '@shared/ui/TextField'
import { Typography } from '@shared/ui/Typography'

import { getData } from '../model/helpers'
import { PromptModalDataProps } from '../model/types'

export const PromptModalData = ({ promptId }: PromptModalDataProps) => {
  const { status, promptById } = useAppSelector(promptByIdSelector)
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getPromptByIdApi(promptId))
  }, [dispatch, promptId])

  useEffect(() => {
    if (promptById?.content !== undefined) {
      setContent(promptById.content)
      setHasChanges(false)
    }
  }, [promptById])

  const handleSave = () => {
    if (!promptById || !hasChanges) {
      return
    }

    setIsSaving(true)

    dispatch(editPromptApi({ prompt_id: promptId, content }))
      .unwrap()
      .then(() => {
        dispatch(updatePromptContent({ content }))
        addSuccessMessage('Content updated successfully')
        setHasChanges(false)
        setIsEditing(false)
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (promptById?.content !== undefined) {
      setContent(promptById.content)
      setHasChanges(false)
    }
    setIsEditing(false)
  }

  if (!promptById || status === 'pending') {
    return (
      <Box
        sx={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid dense data={getData(promptById)} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
            Content
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <IconButton tooltipTitle="Edit" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            ) : (
              <>
                <IconButton tooltipTitle="Undo changes" onClick={handleCancel}>
                  <UndoIcon />
                </IconButton>

                <Button
                  color="success"
                  disabled={!hasChanges}
                  loading={isSaving}
                  variant="contained"
                  onClick={handleSave}
                >
                  Save changes
                </Button>
              </>
            )}
          </Box>
        </Box>
        <TextField
          fullWidth
          multiline
          maxRows={20}
          minRows={15}
          name="content"
          slotProps={{
            input: {
              readOnly: !isEditing,
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: isEditing ? '#ffffff' : '#f5f5f5',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            },
            '& .MuiInputBase-input': {
              overflowY: 'auto',
              maxHeight: '500px',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              cursor: isEditing ? 'text' : 'default',
            },
          }}
          value={content}
          variant="outlined"
          onChange={(e) => {
            if (isEditing) {
              setContent(e.target.value)
              setHasChanges(e.target.value !== promptById?.content)
            }
          }}
        />
      </Box>
    </Box>
  )
}
