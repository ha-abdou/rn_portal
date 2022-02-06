import { Text } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'

const typeName = 'RNText'

const TextRenderer = {
  renderer: createBaseRenderer(Text),
  typeName,
}

export default TextRenderer
