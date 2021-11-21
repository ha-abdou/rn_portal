import { View, ViewStyle } from 'react-native'
import { ITree } from './types'

interface IRendererProps {
  viewport?: {
    width?: number
    height?: number
  }
  style: ViewStyle
  tree: ITree
}
const Renderer = ({ tree, viewport, style }: IRendererProps) => {
  return (
    <View
      style={[
        {
          width: viewport?.width,
          height: viewport?.height,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {parseTree(tree)}
    </View>
  )
}

export const parseTree = (tree?: ITree | ITree[] | null): React.ReactNode => {
  if (Array.isArray(tree)) {
    return tree.map((elm) => parseTree(elm))
  }
  if (tree?.type?.name) {
    const handler = Handlers[tree.type.name]

    if (!handler) {
      console.log('no handler for ', tree)
      return null
    }
    return handler(tree)
  }
  return null
}

let Handlers = {
  Array: (cmp: ITree) => parseTree(cmp.children),
  Component: (cmp: ITree) => parseTree(cmp.children),
  String: (cmp: ITree) => cmp.options.value,
}

export const addRenderer = (typeName: string, render: (cmp: ITree) => React.ReactNode) => {
  Handlers[typeName] = render
}

export default Renderer
