import { addRenderer } from '@rn_portal/renderer'

import ViewRenderer from './View/renderer'
import TextRenderer from './Text/renderer'
import TouchableOpacityRenderer from './TouchableOpacity/renderer'

const loadReactNativeRenderers = () => {
  addRenderer(ViewRenderer.typeName, ViewRenderer.renderer)
  addRenderer(TextRenderer.typeName, TextRenderer.renderer)
  addRenderer(TouchableOpacityRenderer.typeName, TouchableOpacityRenderer.renderer)
}

export default loadReactNativeRenderers
