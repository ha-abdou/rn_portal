import React from 'react'

import { parseTree, ITree } from '@portal/renderer'

const createBaseRenderer =
  (Component: React.ComponentType) =>
  (cmp: ITree): React.ReactNode => {
    return (
      <Component key={cmp.key} {...cmp.props}>
        {parseTree(cmp.children)}
      </Component>
    )
  }

export default createBaseRenderer
