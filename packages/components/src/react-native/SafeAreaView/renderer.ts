import { SafeAreaView } from 'react-native'

import { typeName } from './constants'
import createBaseRenderer from '../../lib/createBaseRenderer'

const SafeAreaViewRenderer = {
  renderer: createBaseRenderer(SafeAreaView),
  typeName,
}

export default SafeAreaViewRenderer
