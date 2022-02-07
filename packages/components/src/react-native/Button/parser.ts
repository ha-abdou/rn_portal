import { Button } from 'react-native'

import { typeName } from './constants'
import createBaseParser from '../../lib/createBaseParser'

const ButtonParser = {
  type: Button,
  parser: createBaseParser(typeName, () => null),
  typeName,
}

export default ButtonParser
