import { addFiberParser } from '@rn_portal/parser'

import ViewParser from './View/parser'
import TextParser from './Text/parser'

const loadReactNativeParsers = () => {
  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
  addFiberParser(TextParser.type, TextParser.typeName, TextParser.parser)
}

export default loadReactNativeParsers
