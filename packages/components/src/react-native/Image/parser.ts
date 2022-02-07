import { Image } from 'react-native'

import { TFiberParser } from '@rn_portal/parser'

import { typeName } from './constants'

const parser: TFiberParser = async (fiber) => {
  return {
    type: { name: typeName },
    props: {
      ...fiber.memoizedProps,
      // @ts-ignore
      source: Image.resolveAssetSource(fiber.memoizedProps.source),
    },
    fiberDebug: fiber._debugSource,
    key: fiber.key,
  }
}

const ImageParser = {
  type: Image,
  parser,
  typeName,
}

export default ImageParser
