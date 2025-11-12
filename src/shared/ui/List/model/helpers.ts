import { ListItem } from './types'

export const getParentIdsForSelectedIndex = (
  items: ListItem[],
  selectedValue: string | null,
  parentIds: string[] = []
): string[] => {
  if (!selectedValue) return []

  for (const item of items) {
    if (item.value === selectedValue) {
      return parentIds
    }

    if (item.children) {
      const found = getParentIdsForSelectedIndex(item.children, selectedValue, [
        ...parentIds,
        item.id,
      ])
      if (found.length) {
        return found
      }
    }
  }

  return []
}
