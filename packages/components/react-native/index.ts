export const loadReactNativeParsers = () => {
  const ViewParser = require('./View').default
  const addFiberParser = require('@portal/parser').addFiberParser

  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
}

export const loadReactNativeRenderers = () => {
  const ViewParser = require('./View').default
  const addRenderer = require('@portal/renderer').addRenderer

  addRenderer(ViewParser.typeName, ViewParser.renderer)
}
