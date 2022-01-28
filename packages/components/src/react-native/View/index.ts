import { View } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'
import createBaseParser from '../../lib/createBaseParser'

export const typeName = 'RNView'

const ViewParser = {
  type: View,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child?.child) as any,
  renderer: createBaseRenderer(View) as any,
  typeName,
}

export default ViewParser
