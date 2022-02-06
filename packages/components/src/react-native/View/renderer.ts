import { View } from 'react-native'

import { typeName } from './constants'
import createBaseRenderer from '../../lib/createBaseRenderer'

const ViewRenderer = {
  renderer: createBaseRenderer(View),
  typeName,
}

export default ViewRenderer
