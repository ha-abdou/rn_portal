import React, { useState } from 'react'

import { loadReactNativeRenderers } from '@portal/components'
// import { createPortalExit } from '@portal/core'

const url = 'ws://172.21.161.39:9100/dashboard'
const protocols = 'echo-protocol'

loadReactNativeRenderers()

//const PortalExit = createPortalExit({
//  wsParams: [url, protocols],
//})

function App() {

  return <div>
    
  </div>;
}

export default App;
