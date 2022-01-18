export const loadReactNativeParsers = () => {
  const ViewParser = require('./View').default
  const addFiberParser = require('@rn_portal/parser').addFiberParser

  addFiberParser(ViewParser.type, ViewParser.typeName, ViewParser.parser)
}

export const loadReactNativeRenderers = () => {
  const ViewParser = require('./View').default
  const addRenderer = require('@rn_portal/renderer').addRenderer

  addRenderer(ViewParser.typeName, ViewParser.renderer)
}
