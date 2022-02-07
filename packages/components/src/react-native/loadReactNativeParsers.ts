import { addFiberParser } from '@rn_portal/parser'

import ViewParser from './View/parser'
import TextParser from './Text/parser'
import TouchableOpacityParser from './TouchableOpacity/parser'
import ButtonParser from './Button/parser'
import ImageParser from './Image/parser'
import TextInputParser from './TextInput/parser'
import SafeAreaViewParser from './SafeAreaView/parser'
import SwitchParser from './Switch/parser'

const loadReactNativeParsers = () => {
  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
  addFiberParser(TextParser.type, TextParser.typeName, TextParser.parser)
  addFiberParser(TouchableOpacityParser.type, TouchableOpacityParser.typeName, TouchableOpacityParser.parser)
  addFiberParser(ButtonParser.type, ButtonParser.typeName, ButtonParser.parser)
  addFiberParser(ImageParser.type, ImageParser.typeName, ImageParser.parser)
  addFiberParser(TextInputParser.type, TextInputParser.typeName, TextInputParser.parser)
  addFiberParser(SafeAreaViewParser.type, SafeAreaViewParser.typeName, SafeAreaViewParser.parser)
  addFiberParser(SwitchParser.type, SwitchParser.typeName, SwitchParser.parser)
}

export default loadReactNativeParsers
