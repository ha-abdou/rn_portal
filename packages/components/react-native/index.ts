import { addFiberParser } from '@portal/parser/parseHandler'
import { addRenderer } from '@portal/renderer'

import ViewParser from './View'

export const loadReactNativeParsers = () => {
  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
}

export const loadReactNativeRenderers = () => {
  addRenderer(ViewParser.typeName, ViewParser.renderer)
}
