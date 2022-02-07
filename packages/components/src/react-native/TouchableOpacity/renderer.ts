import { TouchableOpacity } from 'react-native'

import { typeName } from './constants'
import createBaseRenderer from '../../lib/createBaseRenderer'

const TouchableOpacityRenderer = {
  renderer: createBaseRenderer(TouchableOpacity),
  typeName,
}

export default TouchableOpacityRenderer
