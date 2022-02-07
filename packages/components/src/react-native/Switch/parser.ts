import { Switch } from 'react-native'

import { TFiberParser } from '@rn_portal/parser'

import { typeName } from './constants'

const parser: TFiberParser = async (fiber) => {
  let props: any = {
    ...fiber.memoizedProps,
    children: undefined,
  }
  delete props.children
  // fix for https://github.com/facebook/react-native/issues/30429
  if (props.value) {
    props.activeThumbColor = props.thumbColor
    props.activeTrackColor = props?.trackColor?.false
  }

  return {
    type: { name: typeName },
    fiberDebug: fiber._debugSource,
    props,
    key: fiber.key,
  }
}

const SwitchParser = {
  type: Switch,
  parser,
  typeName,
}

export default SwitchParser
