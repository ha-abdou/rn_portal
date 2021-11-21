import { View } from 'react-native'

import { createBaseParser, createBaseRenderer } from '@portal/core'

export const typeName = 'RNView'

export const ViewParser = {
  type: View,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child?.child),
  renderer: createBaseRenderer(View),
  typeName,
}

export default ViewParser
