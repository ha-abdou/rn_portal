import { Button } from 'react-native'

import { typeName } from './constants'
import createBaseRenderer from '../../lib/createBaseRenderer'

const ButtonRenderer = {
  renderer: createBaseRenderer(Button),
  typeName,
}

export default ButtonRenderer
