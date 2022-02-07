import React from 'react'

import { parseTree, ITree, TParsedFiberRenderer } from '@rn_portal/renderer'

const createBaseRenderer =
  // @ts-ignore: todo fix ts


    (Component: any): TParsedFiberRenderer =>
    (cmp: ITree): React.ReactNode => {
      return (
        <Component key={cmp.key || undefined} {...cmp.props}>
          {parseTree(cmp.children)}
        </Component>
      )
    }

export default createBaseRenderer
