import React, { useRef } from 'react'
import { SafeAreaView, View, Button } from 'react-native'

import { creatPortalEntrance, IPortalRefType } from '@portal/core'
import { loadReactNativeParsers } from '@portal/components'

const url = 'ws://172.21.161.39:9100/phone'
const protocols = 'echo-protocol'

loadReactNativeParsers()
const Portal = creatPortalEntrance({
  wsParams: [url, protocols],
})
const App = () => {
  const portalRef = useRef<IPortalRefType>(null)
  const capture = () => {
    if (!portalRef.current) return
    portalRef.current
      .capture()
      .then((res) => {
        console.log('res', res)
      })
      .catch((e) => {
        console.log('error', e)
      })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      <Button title="capture" onPress={capture} />
      <Portal ref={portalRef}>
        <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      </Portal>
    </SafeAreaView>
  )
}

export default App
