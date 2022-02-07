import { Switch } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'

import { typeName } from './constants'

const SwitchRenderer = {
  renderer: createBaseRenderer(Switch),
  typeName,
}

export default SwitchRenderer
