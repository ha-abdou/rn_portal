import { addRenderer } from '@rn_portal/renderer'

import ViewRenderer from './View/renderer'
import TextRenderer from './Text/renderer'
import TouchableOpacityRenderer from './TouchableOpacity/renderer'
import ButtonRenderer from './Button/renderer'
import ImageRenderer from './Image/renderer'

const loadReactNativeRenderers = () => {
  addRenderer(ViewRenderer.typeName, ViewRenderer.renderer)
  addRenderer(TextRenderer.typeName, TextRenderer.renderer)
  addRenderer(TouchableOpacityRenderer.typeName, TouchableOpacityRenderer.renderer)
  addRenderer(ButtonRenderer.typeName, ButtonRenderer.renderer)
  addRenderer(ImageRenderer.typeName, ImageRenderer.renderer)
}

export default loadReactNativeRenderers
