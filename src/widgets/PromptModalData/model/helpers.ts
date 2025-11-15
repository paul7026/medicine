import { PromptById } from '@entities/prompts'

export const getData = (promptById: PromptById) => {
  return [
    { title: 'id', subtitle: promptById.id },
    { title: 'clinic_id', subtitle: promptById.clinic_id },
    { title: 'prettify_name', subtitle: promptById.prettify_name },
  ]
}
