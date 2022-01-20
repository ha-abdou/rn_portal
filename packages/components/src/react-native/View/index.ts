import { View } from 'react-native'

import { createBaseParser, createBaseRenderer } from '@rn_portal/core'

export const typeName = 'RNView'

const ViewParser = {
  type: View,
  parser: createBaseParser(typeName, (fiber) => fiber?.child?.child?.child) as any,
  renderer: createBaseRenderer(View) as any,
  typeName,
}

export default ViewParser
