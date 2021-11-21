import { View, StyleSheet, MeasureOnSuccessCallback, StyleProp, ViewStyle } from 'react-native'
import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import Parser, { TFiberNode } from '@portal/parser'
import sleep from './lib/sleep'

interface ICreatPortalOptions {
  wsParams?: ConstructorParameters<typeof W3CWebSocket>
}

interface IPortalProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

type ICaptureResult = {
  viewport: { xo: number; yo: number; width: number; height: number; x: number; y: number }
  dt: number
  tree: any
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

const creatPortal = ({ wsParams }: ICreatPortalOptions) => {
  const client = wsParams ? new W3CWebSocket(...wsParams) : null

  return forwardRef<IPortalRefType, IPortalProps>(function Portal({ children, style }, portalRef) {
    const ref = useRef(null)
    const [_, forceUpdate] = useState(0)

    useImperativeHandle(
      portalRef,
      () => ({
        capture: async () => {
          // force update to get last fiber value of child
          forceUpdate((_) => _ + 1)
          await sleep(1)

          if (!ref.current) throw new Error('ref not ready, call later')

          return await snap(ref.current)
        },
        onerror: (callback) => void (client && (client.onerror = callback)),
        onclose: (callback) => void (client && (client.onclose = callback)),
        onopen: (callback) => void (client && (client.onopen = callback)),
        send: () => void 0,
      }),
      [],
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
    // @ts-ignore
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

export default creatPortal
