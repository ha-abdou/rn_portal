import { Image } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'

import { typeName } from './constants'

const ImageRenderer = {
  renderer: createBaseRenderer(Image),
  typeName,
}

export default ImageRenderer
