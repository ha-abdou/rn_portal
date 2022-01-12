import { loadReactNativeRenderers } from '@portal/components'
import { createPortalExit } from '@portal/core'
import { IPortalExistRefType } from '@portal/core/src/portalExit'
import { useRef } from 'react'

const url = 'ws://172.21.161.39:9100/dashboard'
const protocols = 'echo-protocol'

loadReactNativeRenderers()

const PortalExit = createPortalExit({
  wsParams: [url, protocols],
})

function App() {
  const portalRef = useRef<IPortalExistRefType>(null)
  const capture = () => {
    portalRef.current?.capture()
  }

  return (
    <div >
      <button onClick={capture}>capture</button>
      <PortalExit ref={portalRef} />
    </div>
  );
}

export default App;
