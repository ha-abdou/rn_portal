import { addFiberParser } from '@rn_portal/parser'
import { addRenderer } from '@rn_portal/renderer'
import ViewParser from './View'

export const loadReactNativeParsers = () => {
  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
}

export const loadReactNativeRenderers = () => {
  addRenderer(ViewParser.typeName, ViewParser.renderer)
}
