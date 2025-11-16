import { Box } from '@shared/ui/Box'

import { ContraindicationList } from './ContraindicationList'

export const ContraindicationsForm = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ContraindicationList
        label="Allergy"
        name="contraindications_allergies"
      />
      <ContraindicationList
        label="Custom allergy"
        name="contraindications_custom_allergies"
      />
      <ContraindicationList
        label="Chronic condition"
        name="contraindications_chronic_conditions"
      />
      <ContraindicationList
        label="Custom condition"
        name="contraindications_custom_conditions"
      />
      <ContraindicationList
        label="Health condition"
        name="contraindications_health_conditions"
      />
      <ContraindicationList
        label="Medication restriction"
        name="contraindications_medication_restrictions"
      />
      <ContraindicationList
        label="Custom restriction"
        name="contraindications_custom_restrictions"
      />
      <ContraindicationList
        label="Ethical choice"
        name="contraindications_ethical_choices"
      />
      <ContraindicationList
        label="Custom feature"
        name="contraindications_custom_features"
      />
    </Box>
  )
}
