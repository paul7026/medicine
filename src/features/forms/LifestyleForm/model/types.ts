export interface LifestyleListProps {
  label: string
  name: ArrayFieldName
}

type ArrayFieldName =
  | 'lifestyle_physical_activities'
  | 'lifestyle_custom_activities'
  | 'lifestyle_eating_habits'
