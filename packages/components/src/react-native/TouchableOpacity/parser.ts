import { TouchableOpacity } from 'react-native'

import { typeName } from './constants'
import createBaseParser from '../../lib/createBaseParser'

const TouchableOpacityParser = {
  type: TouchableOpacity,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child?.child?.child?.child?.child?.child),
  typeName,
}

export default TouchableOpacityParser
