import Renderer, { ITree } from '@portal/renderer'
import { useImperativeHandle, forwardRef, useState, useEffect, memo } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { StyleProp, ViewStyle } from 'react-native'
import { TViewPort } from './types'
import { isWSNewCaptureAction, wsRequestCaptureAction } from './WSActions'

interface ICreatPortalExitOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

type ICaptureResult = {
  viewport: TViewPort
  dt: number
  tree: ITree | null
}

export interface IPortalExistRefType {
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

const createPortalExit = ({ wsParams }: ICreatPortalExitOptions) => {
  const client = wsParams ? new W3CWebSocket(...wsParams) : null
  let onCapture: ((res: ICaptureResult) => void) | null = null

  return memo(
    forwardRef<IPortalExistRefType, IProtalexistProps>(function PortalExist({ style }, portalRef) {
      const [captureResult, setTree] = useState<ICaptureResult | null>(null)
      const [viewPortStyle, setViewPortStyle] = useState<{ width?: number; height?: number }>()

      useEffect(() => {
        if (client) {
          client.onmessage = ({ data }) => {
            if (typeof data !== 'string') return
            const parsedData = JSON.parse(data)

            if (isWSNewCaptureAction(parsedData.type)) {
              // console.log('new tree', parsedData.payload)
              setTree(parsedData.payload)
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

      useImperativeHandle(
        portalRef,
        () => ({
          getTree: () => captureResult?.tree,
          capture: () => client?.send(wsRequestCaptureAction()),
          onerror: (callback) => void (client && (client.onerror = callback)),
          onclose: (callback) => void (client && (client.onclose = callback)),
          onopen: (callback) => void (client && (client.onopen = callback)),
          onCapture: (callback) => void (onCapture = callback),
        }),
        [captureResult?.tree],
      )

      if (!captureResult?.tree) return null

      return <Renderer tree={captureResult?.tree} style={[style, viewPortStyle]} />
    }),
  )
}

export default createPortalExit
