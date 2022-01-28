import React, { useCallback, useEffect, useRef } from 'react'
import { SafeAreaView, View, Button } from 'react-native'

import creatPortalEntrance from '@rn_portal/entrance'

const url = 'ws://172.18.23.85:9100/phone'
const protocols = 'echo-protocol'

const [Portal, controller] = creatPortalEntrance({
  wsParams: [url, protocols],
})
const App = () => {
  const capture = useCallback(() => {
    controller.capture()
  }, [])
  
  useEffect(() => {
    controller.onCapture((res) => {
      console.log('capture', res)
    })
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      <Button title="capture" onPress={capture} />
      <Portal >
        <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        <View style={{ width: 100, height: 100, backgroundColor: 'yellow' }} />
        <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
      </Portal>
    </SafeAreaView>
  )
}

export default App
