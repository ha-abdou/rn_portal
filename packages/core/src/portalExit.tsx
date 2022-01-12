import Renderer, { ITree } from '@portal/renderer'
import { useImperativeHandle, forwardRef, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { StyleProp, ViewStyle } from 'react-native'

interface ICreatPortalExitOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

export interface IPortalExistRefType {
  getTree: () => ITree | null
  capture: () => void
  onerror: (callback: W3CWebSocket['onerror']) => void
  onclose: (callback: W3CWebSocket['onclose']) => void
  onopen: (callback: W3CWebSocket['onopen']) => void
}

interface IProtalexistProps {
  style?: StyleProp<ViewStyle>
}

const createPortalExit = ({ wsParams }: ICreatPortalExitOptions) => {
  const client = wsParams ? new W3CWebSocket(...wsParams) : null

  return forwardRef<IPortalExistRefType, IProtalexistProps>(function PortalExist({ style }, portalRef) {
    const [tree, setTree] = useState<ITree | null>(null)

    useImperativeHandle(
      portalRef,
      () => ({
        getTree: () => tree,
        capture: async () => {
          if (client) {
            // todo refetch
            setTree(null)
          }
        },
        onerror: (callback) => void (client && (client.onerror = callback)),
        onclose: (callback) => void (client && (client.onclose = callback)),
        onopen: (callback) => void (client && (client.onopen = callback)),
      }),
      [tree],
    )

    if (!tree) return null

    return <Renderer tree={tree} style={style} />
  })
}

export default createPortalExit
