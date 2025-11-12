import { Box } from '../../Box'
import { Checkbox, CheckboxProps } from '../../Checkbox'
import { CheckboxTreeItem } from '../model/types'

export interface CheckboxTreeProps extends CheckboxProps {
  data: CheckboxTreeItem[]
  onDataChange: (data: CheckboxTreeItem[]) => void
}

export const CheckboxTree = ({
  data,
  onDataChange,
  ...rest
}: CheckboxTreeProps) => {
  const updateNode = (
    nodes: CheckboxTreeItem[],
    id: string,
    checked: boolean
  ): CheckboxTreeItem[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        const updatedChildren = node.children
          ? node.children.map((child) => ({
              ...child,
              checked,
              indeterminate: false,
              children: child.children
                ? updateNode(child.children, child.id, checked)
                : child.children,
            }))
          : node.children

        return {
          ...node,
          checked,
          indeterminate: false,
          children: updatedChildren,
        }
      }

      if (node.children) {
        const updatedChildren = updateNode(node.children, id, checked)
        const allChecked = updatedChildren.every((c) => c.checked)
        const someChecked = updatedChildren.some((c) => c.checked)

        return {
          ...node,
          checked: allChecked,
          indeterminate: !allChecked && someChecked,
          children: updatedChildren,
        }
      }

      return node
    })
  }

  const handleChange = (id: string, checked: boolean) => {
    const updated = updateNode(data, id, checked)
    onDataChange(updated)
  }

  const renderNode = (node: CheckboxTreeItem) => {
    const hasChildren = node.children && node.children.length > 0
    const isIndeterminate =
      hasChildren &&
      node.children!.some((child) => child.checked) &&
      !node.children!.every((child) => child.checked)

    return (
      <Box key={node.id} sx={{ ml: hasChildren ? 0 : 3 }}>
        <Checkbox
          {...rest}
          checked={node.checked}
          indeterminate={isIndeterminate}
          label={node.label}
          onChange={(e) => handleChange(node.id, e.target.checked)}
        />

        {hasChildren && (
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {node.children!.map((child) => renderNode(child))}
          </Box>
        )}
      </Box>
    )
  }

  return <Box>{data.map((node) => renderNode(node))}</Box>
}
