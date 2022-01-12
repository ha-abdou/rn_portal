import { createPortalExit } from '@portal/core'
import { IPortalExistRefType } from '@portal/core/src/portalExit'
import { useCallback, useEffect, useRef, useState } from 'react'

const url = 'ws://172.21.161.39:9100/dashboard'
const protocols = 'echo-protocol'

const PortalExit = createPortalExit({
  wsParams: [url, protocols],
})

function App() {
  const portalRef = useRef<IPortalExistRefType>(null)
  const [dt, setDT] = useState<number | undefined>()
  const capture = useCallback(() => {
    portalRef.current?.capture()
  }, [])
  
  useEffect(() => {
    portalRef.current?.onCapture(({ dt }) => {
      setDT(dt)
    })
  }, [])

  return (
    <div style={styles.container} >
      <button onClick={capture}>capture</button>
      <p>parse time: {dt} ms</p>
      <PortalExit ref={portalRef} style={styles.portal} />
    </div>
  );
}

const styles = {
  portal: { borderColor: 'black', borderWidth: 2, backgroundColor: 'white', margin: 10 },
  container: { backgroundColor: 'grey', flex: 1}
}

export default App;
