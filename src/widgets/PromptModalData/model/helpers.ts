import { PromptById } from '@entities/prompts'

import { formatIsoString } from '@shared/helpers/formatIsoString'

export const getData = (promptById: PromptById) => {
  return [
    { title: 'id', subtitle: promptById.id },
    { title: 'clinic_id', subtitle: promptById.clinic_id },
    { title: 'name', subtitle: promptById.name },
    { title: 'content', subtitle: promptById.content },
    { title: 'created_at', subtitle: formatIsoString(promptById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(promptById.updated_at) },
  ]
}
