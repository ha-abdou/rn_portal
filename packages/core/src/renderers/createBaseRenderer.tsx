import React from 'react'

import { parseTree } from '@portal/renderer'
import { ITree } from '@portal/renderer/types'

// todo Component type
const createBaseRenderer =
  (Component: any) =>
  (cmp: ITree): React.ReactNode => {
    return (
      <Component key={cmp.key} {...cmp.props}>
        {parseTree(cmp.children)}
      </Component>
    )
  }

export default createBaseRenderer
