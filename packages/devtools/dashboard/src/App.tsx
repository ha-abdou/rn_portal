import { createPortalExit } from '@rn_portal/core'
import { useEffect, useState } from 'react'

const url = 'ws://192.168.67.68:9100/dashboard'
const protocols = 'echo-protocol'

const [PortalExit, controller] = createPortalExit({
  wsParams: [url, protocols],
})

function App() {
  const [dt, setDT] = useState<number | undefined>()
  
  useEffect(() => {
    controller.onCapture(({ dt }) => {
      setDT(dt)
    })
  }, [])

  return (
    <div style={styles.container} >
      <button onClick={controller.capture}>capture</button>
      <p>parse time: {dt} ms</p>
      <PortalExit style={styles.portal} />
    </div>
  );
}

const styles = {
  portal: { borderColor: 'black', borderWidth: 2, backgroundColor: 'white', margin: 10 },
  container: { backgroundColor: 'grey', flex: 1}
}

export default App;
