import { View, StyleSheet, MeasureOnSuccessCallback, StyleProp, ViewStyle } from 'react-native'
import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import Parser, { IParsedFiber, TFiberNode } from '@portal/parser'
import sleep from './lib/sleep'
import { TViewPort } from './types'
import { isWSRequestCaptureAction, wsNewCaptureAction } from './WSActions'
import { loadReactNativeParsers } from '@portal/components'

interface ICreatPortalEntranceOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

interface IPortalProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export type ICaptureResult = {
  viewport: TViewPort
  dt: number
  tree: IParsedFiber[] | null
}

export interface IPortalRefType {
  capture: () => Promise<ICaptureResult>
  onerror: (callback: W3CWebSocket['onerror']) => void
  onclose: (callback: W3CWebSocket['onclose']) => void
  onopen: (callback: W3CWebSocket['onopen']) => void
  send: () => void
}

// without this func, measure will not work, dont know why
const dummyFunc = () => void 0
let loaded = false

const creatPortalEntrance = ({ wsParams }: ICreatPortalEntranceOptions) => {
  if (!loaded) {
    loadReactNativeParsers()
    loaded = true
  }

  const client = wsParams ? new W3CWebSocket(...wsParams) : null

  return forwardRef<IPortalRefType, IPortalProps>(function Portal({ children, style }, portalRef) {
    const ref = useRef(null)
    const [, forceUpdate] = useState(0)
    const capture = useCallback(async () => {
      // force update to get last fiber value of child
      forceUpdate((u) => u + 1)
      await sleep(1)

      if (!ref.current) {
        throw new Error('ref not ready, call later')
      }

      const res = await snap(ref.current)
      client?.send(wsNewCaptureAction(res))
      return res
    }, [])

    useEffect(() => {
      if (client) {
        client.onmessage = ({ data }) => {
          if (typeof data !== 'string') return
          const parsedData = JSON.parse(data)

          if (isWSRequestCaptureAction(parsedData.type)) {
            capture()
          }
        }
      }
      return () => {
        client?.close()
      }
    }, [])

    useImperativeHandle(
      portalRef,
      () => ({
        capture,
        onerror: (callback) => void (client && (client.onerror = callback)),
        onclose: (callback) => void (client && (client.onclose = callback)),
        onopen: (callback) => void (client && (client.onopen = callback)),
        send: () => void 0,
      }),
      [capture],
    )

    return (
      <View style={[styles.containerView, style]} ref={ref} onLayout={dummyFunc}>
        {children}
      </View>
    )
  })
}

const snap = async (ref: View) => {
  try {
    // @ts-ignore _internalFiberInstanceHandleDEV exist but not typed
    const fiber = ref._internalFiberInstanceHandleDEV.child as TFiberNode
    const at = Date.now()
    const [xo, yo, width, height, x, y] = await measure(ref)
    const tree = await Parser(fiber)

    return {
      viewport: { xo, yo, width, height, x, y },
      tree,
      dt: Date.now() - at,
    }
  } catch (e) {
    // todo error
    console.log('Fail to parse components', e)
    throw e
  }
}

const measure = (ref: View) => {
  return new Promise<Parameters<MeasureOnSuccessCallback>>((resolve) => {
    ref.measure(function (...args) {
      resolve(args)
    })
  })
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
})

export default creatPortalEntrance
