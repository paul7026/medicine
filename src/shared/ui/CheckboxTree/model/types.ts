export interface CheckboxTreeItem {
  id: string
  label: string
  checked: boolean
  children?: CheckboxTreeItem[]
}
