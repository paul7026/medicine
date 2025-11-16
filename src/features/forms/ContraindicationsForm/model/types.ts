export interface ContraindicationListProps {
  label: string
  name: FieldArrayName
}

type FieldArrayName =
  | 'contraindications_allergies'
  | 'contraindications_custom_allergies'
  | 'contraindications_chronic_conditions'
  | 'contraindications_custom_conditions'
  | 'contraindications_health_conditions'
  | 'contraindications_medication_restrictions'
  | 'contraindications_custom_restrictions'
  | 'contraindications_ethical_choices'
  | 'contraindications_custom_features'
