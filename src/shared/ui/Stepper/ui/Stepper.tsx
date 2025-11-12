import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Stack, Step, StepLabel, Stepper as StepperMui } from '@mui/material'

import { FieldValues, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'

import { ModalStepperProps } from '../model/types'

export const Stepper = <T extends FieldValues>({
  form,
  activeStep,
  children,
  steps,
  sx,
  submitBtnTitle,
  onClose,
  setActiveStep,
  onSubmit,
}: ModalStepperProps<T>) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'CREATE_VIRTUAL_MACHINES.STEPPER',
  })

  const backClickHandler = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const nextClickHandler = async () => {
    const isStepValid = form ? await form.trigger() : true

    if (isStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const resetClickHandler = () => {
    setActiveStep(0)

    if (form) {
      form.reset()
    }
  }

  return (
    <Box sx={sx}>
      <StepperMui alternativeLabel activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StepperMui>

      {form ? (
        <FormProvider {...form}>
          <form>{children}</form>
        </FormProvider>
      ) : (
        <div>{children}</div>
      )}

      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        {activeStep === 0 && <Button onClick={onClose}>{t('CANCEL')}</Button>}

        {activeStep === steps.length - 1 && (
          <Button
            color="error"
            style={{ marginRight: 'auto' }}
            variant="contained"
            onClick={resetClickHandler}
          >
            {t('RESET')}
          </Button>
        )}

        {activeStep > 0 && (
          <Button
            startIcon={<KeyboardArrowLeftIcon />}
            variant="outlined"
            onClick={backClickHandler}
          >
            {t('BACK')}
          </Button>
        )}

        {activeStep === steps.length - 1 ? (
          <Button color="primary" variant="contained" onClick={onSubmit}>
            {submitBtnTitle ? submitBtnTitle : t('CREATE')}
          </Button>
        ) : (
          <Button
            color="primary"
            endIcon={<KeyboardArrowRightIcon />}
            variant="outlined"
            onClick={nextClickHandler}
          >
            {t('NEXT')}
          </Button>
        )}
      </Stack>
    </Box>
  )
}
