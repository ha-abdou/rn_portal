import { SafeAreaView } from 'react-native'

import { typeName } from './constants'
import createBaseParser from '../../lib/createBaseParser'

const SafeAreaViewParser = {
  type: SafeAreaView,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child),
  typeName,
}

export default SafeAreaViewParser
