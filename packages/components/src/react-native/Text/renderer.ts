import { Text } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'

import { typeName } from './constants'

const TextRenderer = {
  renderer: createBaseRenderer(Text),
  typeName,
}

export default TextRenderer
