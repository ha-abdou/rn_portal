import { addRenderer } from '@rn_portal/renderer'

import ViewRenderer from './View/renderer'
import TextRenderer from './Text/renderer'

const loadReactNativeRenderers = () => {
  addRenderer(ViewRenderer.typeName, ViewRenderer.renderer)
  addRenderer(TextRenderer.typeName, TextRenderer.renderer)
}

export default loadReactNativeRenderers
