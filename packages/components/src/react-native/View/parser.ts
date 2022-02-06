import { View } from 'react-native'

import { typeName } from './constants'
import createBaseParser from '../../lib/createBaseParser'

const ViewParser = {
  type: View,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child?.child),
  typeName,
}

export default ViewParser
