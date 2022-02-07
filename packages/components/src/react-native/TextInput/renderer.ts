import { TextInput } from 'react-native'

import createBaseRenderer from '../../lib/createBaseRenderer'

import { typeName } from './constants'

const TextInputRenderer = {
  renderer: createBaseRenderer(TextInput),
  typeName,
}

export default TextInputRenderer
