import Renderer, { ITree } from '@rn_portal/renderer'
import { useState, useEffect, memo } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { StyleProp, ViewStyle } from 'react-native'
import { TViewPort } from './types'
import { isWSNewCaptureAction, wsRequestCaptureAction } from './WSActions'
import { loadReactNativeRenderers } from '@rn_portal/components'

interface ICreatPortalExitOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

type ICaptureResult = {
  viewport: TViewPort
  dt: number
  tree: ITree | null
}

export interface IPortalExistController {
  getTree: () => ITree | undefined | null
  capture: () => void
  onCapture: (callback: (res: ICaptureResult) => void) => void
  onerror: (callback: W3CWebSocket['onerror']) => void
  onclose: (callback: W3CWebSocket['onclose']) => void
  onopen: (callback: W3CWebSocket['onopen']) => void
}

interface IProtalexistProps {
  style?: StyleProp<ViewStyle>
}

let loaded = false

const createPortalExit = ({ wsParams }: ICreatPortalExitOptions) => {
  if (!loaded) {
    loadReactNativeRenderers()
    loaded = true
  }

  const client = wsParams ? new W3CWebSocket(...wsParams) : null
  let onCapture: ((res: ICaptureResult) => void) | null = null
  let captureResult: ICaptureResult | null = null
  const controller: IPortalExistController = {
    getTree: () => captureResult?.tree,
    capture: () => client?.send(wsRequestCaptureAction()),
    onerror: (callback) => void (client && (client.onerror = callback)),
    onclose: (callback) => void (client && (client.onclose = callback)),
    onopen: (callback) => void (client && (client.onopen = callback)),
    onCapture: (callback) => void (onCapture = callback),
  }

  const Portal = memo(function PortalExist({ style }: IProtalexistProps) {
    const [, forceUpdate] = useState(0)
    const [viewPortStyle, setViewPortStyle] = useState<{ width?: number; height?: number }>()

    useEffect(() => {
      if (client) {
        client.onmessage = ({ data }) => {
          if (typeof data !== 'string') return
          const parsedData = JSON.parse(data)

          if (isWSNewCaptureAction(parsedData.type)) {
            captureResult = parsedData.payload
            forceUpdate((u) => u + 1)
            onCapture?.(parsedData.payload)
          }
        }
      }
      return () => {
        client?.close()
      }
    }, [])

    useEffect(() => {
      setViewPortStyle({ width: captureResult?.viewport.width, height: captureResult?.viewport.height })
    }, [captureResult?.viewport.width, captureResult?.viewport.height])

    if (!captureResult?.tree) return null

    return <Renderer tree={captureResult?.tree} style={[style, viewPortStyle]} />
  })

  return [Portal, controller] as const
}

export default createPortalExit
