import { Text } from 'react-native'
// @ts-ignore
import TextAncestor from 'react-native/Libraries/Text/TextAncestor'

import { TFiberParser } from '@rn_portal/parser'

import { typeName } from './constants'

const parser: TFiberParser = async (fiber, walker) => {
  // root text
  if (fiber?.child?.type === TextAncestor.Provider && fiber?.child?.child?.type === 'RCTText') {
    const child = fiber.child.child.child
    const props = {
      ...fiber.memoizedProps,
      children: undefined,
    }
    delete props.children

    return {
      type: { name: typeName },
      fiberDebug: fiber._debugSource,
      props,
      key: fiber.key,
      children: await walker(child),
    }
  }
  // text in text
  if (fiber.child?.type === 'RCTVirtualText') {
    const child = fiber.child.child
    const props = {
      ...fiber.memoizedProps,
    }
    delete props.children

    return {
      type: { name: typeName },
      fiberDebug: fiber._debugSource,
      props,
      key: fiber.key,
      children: await walker(child),
    }
  }

  // todo handle this error
  return {
    type: { name: 'Component' },
    fiberDebug: fiber._debugSource,
    key: fiber.key,
  }
}

const TextParser = {
  type: Text,
  parser,
  typeName,
}

export default TextParser
