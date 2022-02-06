import React from 'react'
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native'

import { ITree, TParsedFiberRenderer } from './types'

interface IRendererProps {
  style?: StyleProp<ViewStyle>
  tree: ITree
}
const Renderer = ({ tree, style }: IRendererProps) => {
  return <View style={[styles.containerView, style]}>{parseTree(tree)}</View>
}

const styles = StyleSheet.create({
  containerView: {
    overflow: 'hidden',
  },
})

export const parseTree = (tree?: ITree | ITree[] | null): React.ReactNode => {
  if (Array.isArray(tree)) {
    return tree.map((elm) => parseTree(elm))
  }
  if (tree?.type?.name) {
    const handler = Handlers[tree.type.name]

    if (!handler) {
      // todo error
      console.log('no handler for ', tree)
      return null
    }
    return handler(tree)
  }
  return null
}

const Handlers: { [key: string]: TParsedFiberRenderer } = {
  Array: (cmp: ITree) => parseTree(cmp.children),
  Component: (cmp: ITree) => parseTree(cmp.children),
  String: (cmp: ITree): string => (cmp.options?.value as string) || '',
}

export const addRenderer = (typeName: string, render: TParsedFiberRenderer) => {
  Handlers[typeName] = render
}

export default Renderer
export * from './types'
