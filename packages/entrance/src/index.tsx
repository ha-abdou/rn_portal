import { View, StyleSheet, MeasureOnSuccessCallback, StyleProp, ViewStyle } from 'react-native'
import React, { useRef, useState, memo, useEffect, useCallback } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import Parser, { TFiberNode } from '@rn_portal/parser'
import sleep from '@rn_portal/core/src/lib/sleep'
import { ICaptureResult } from '@rn_portal/core/src/types'
import { isWSRequestCaptureAction, wsNewCaptureAction } from '@rn_portal/core/src/WSActions'

interface ICreatPortalEntranceOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

interface IPortalProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export interface IPortalController {
  capture: () => void
  onerror: (callback: W3CWebSocket['onerror']) => void
  onclose: (callback: W3CWebSocket['onclose']) => void
  onopen: (callback: W3CWebSocket['onopen']) => void
  onCapture: (callback: (res: ICaptureResult) => void) => void
}

// without this func, measure will not work, dont know why
const dummyFunc = () => void 0
let loaded = false

const creatPortalEntrance = ({ wsParams }: ICreatPortalEntranceOptions) => {
  if (!loaded) {
    const loadReactNativeParsers = require('@rn_portal/components/src/react-native/loadReactNativeParsers').default
    loadReactNativeParsers()
    loaded = true
  }

  const client = wsParams ? new W3CWebSocket(...wsParams) : null
  let onCapture: ((res: ICaptureResult) => void) | null = null
  const controller: IPortalController = {
    capture: () => null,
    onerror: (callback) => void (client && (client.onerror = callback)),
    onclose: (callback) => void (client && (client.onclose = callback)),
    onopen: (callback) => void (client && (client.onopen = callback)),
    onCapture: (callback) => void (onCapture = callback),
  }

  const Portal = memo(function Portal({ children, style }: IPortalProps) {
    const ref = useRef(null)
    const [, forceUpdate] = useState(0)
    const capture = useCallback(async () => {
      // force update to get last fiber value of child
      forceUpdate((u) => u + 1)
      await sleep(0)

      if (!ref.current) {
        throw new Error('ref not ready, call later')
      }

      const res = await snap(ref.current)
      onCapture?.(res)
      client?.send(wsNewCaptureAction(res))
    }, [])

    useEffect(() => {
      controller.capture = capture
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

    return (
      <View style={[styles.containerView, style]} ref={ref} onLayout={dummyFunc}>
        {children}
      </View>
    )
  })
  return [Portal, controller] as const
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
