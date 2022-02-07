import { TextInput } from 'react-native'
import React from 'react'
import { TFiberParser } from '@rn_portal/parser'

import { typeName } from './constants'

const parser: TFiberParser = async (fiber, Walker) => {
  const props = {
    ...fiber.memoizedProps,
    children: undefined,
  }
  delete props.children

  // @ts-ignore
  if (typeof props.value === 'string') {
    return {
      type: { name: typeName },
      fiberDebug: fiber._debugSource,
      props,
      key: fiber.key,
    }
  }
  // @ts-ignore
  const propsChildren = React.Children.toArray(fiber.memoizedProps.children)

  if (propsChildren.length === 0) {
    return {
      type: { name: typeName },
      fiberDebug: fiber._debugSource,
      props,
      key: fiber.key,
    }
  }
  let value = ''

  for (const child of propsChildren) {
    if (typeof child === 'string') {
      value += child
      continue
    }
    // todo get childBySource because findFirstChildBySource dont check siblings
    // this work only if first child of the TextInput is a Text
    // @ts-ignore
    const childFiber = findFirstChildBySource(fiber, child._source)

    if (!childFiber) {
      continue
    }
    // todo finish
    continue
    const parsedFiber = await Walker(childFiber)
    const v = reduceParcedTextFiber(parsedFiber)

    value += v
  }

  // @ts-ignore
  props.value = props.multiline ? value : value.replace('\n', ' ')
  return {
    type: { name: typeName },
    fiberDebug: fiber._debugSource,
    props,
    key: fiber.key,
  }
}

// todo ts
const findFirstChildBySource: any = (fiber: any, source: any) => {
  if (!fiber) return
  return fiber._debugSource === source ? fiber : findFirstChildBySource(fiber.child, source)
}

//@ts-ignore
const reduceParcedTextFiber = (text, acc = '') => {
  if (!text) return acc
  if (Array.isArray(text)) {
    let res = acc

    for (const t of text) {
      res += reduceParcedTextFiber(t, res) || ''
    }
    return res
  }
  if (text?.type?.name === 'RNText' || text?.type?.name === 'Array') {
    return reduceParcedTextFiber(text.children, acc) || ''
  }
  if (text?.type?.name === 'String') {
    return text.value || ''
  }
  return acc
}

const TextInputParser = {
  type: TextInput,
  parser,
  typeName,
}

export default TextInputParser
