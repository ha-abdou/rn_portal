import React, { useRef } from 'react'
import { SafeAreaView, View, Button } from 'react-native'

import { creatPortal, IPortalRefType } from '@portal/core'
import { loadReactNativeParsers } from '@portal/components'

const url = 'ws://192.168.236.122:9100/phone'
const protocols = 'echo-protocol'

loadReactNativeParsers()
const Portal = creatPortal({
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
        <View style={{ width: 100, height: 100, backgroundColor: 'white' }} />
      </Portal>
    </SafeAreaView>
  )
}

export default App
