import VisibilityIcon from '@mui/icons-material/Visibility'
import { Tooltip } from '@mui/material'

import { UserById } from '@entities/users'

import { isArray } from '@shared/helpers/isArray'
import { IconButton } from '@shared/ui/IconButton'
import { Link } from '@shared/ui/Link'

export const getData = (
  userById: UserById,
  onClinicClick: () => void,
  onLifestyleClick: () => void,
  onContraindicationsClick: () => void
) => {
  return [
    { title: 'id', subtitle: userById.id },
    { title: 'external_id', subtitle: userById.external_id },
    { title: 'tenant', subtitle: userById.tenant },
    {
      title: 'clinic_id',
      subtitle: (
        <Link color="info" variant="button" onClick={onClinicClick}>
          {userById.clinic_id}
        </Link>
      ),
    },
    { title: 'name', subtitle: userById.name },
    { title: 'country', subtitle: userById.country },
    { title: 'date_of_birth', subtitle: userById.date_of_birth },
    { title: 'height', subtitle: `${userById.height} cm` },
    { title: 'weight', subtitle: `${userById.weight} kg` },
    { title: 'gender', subtitle: userById.gender },
    { title: 'goal', subtitle: userById.goal },
    { title: 'custom_goal', subtitle: userById.custom_goal },
    {
      title: 'complaints',
      subtitle: isArray(userById.complaints)
        ? userById.complaints.join(', ')
        : userById.complaints,
    },
    { title: 'custom_complaint', subtitle: userById.custom_complaint },
    {
      title: 'lifestyle',
      subtitle: (
        <Tooltip title="View lifestyle">
          <IconButton size="small" onClick={onLifestyleClick}>
            <VisibilityIcon color="info" fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      title: 'contraindications',
      subtitle: (
        <Tooltip title="View contraindications">
          <IconButton size="small" onClick={onContraindicationsClick}>
            <VisibilityIcon color="info" fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
    { title: 'is_onboarded', subtitle: userById.is_onboarded ? 'Yes' : 'No' },
  ]
}
