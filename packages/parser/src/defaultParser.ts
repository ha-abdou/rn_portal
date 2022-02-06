import getFiberTypeName from './lib/getFiberDisplayName'
import { TFiberParser } from './types'

import Walker from './walker'

export const defaultTypeName = 'Component'
export const defaultParser: TFiberParser = async (fiber, walker: Walker) => {
  const props = {
    ...fiber.memoizedProps,
  }
  delete props.children

  return {
    type: {
      name: defaultTypeName,
      displayName: getFiberTypeName(fiber),
    },
    fiberDebug: fiber._debugSource,
    props,
    key: fiber.key,
    children: await walker(fiber.child),
  }
}

export default defaultParser
