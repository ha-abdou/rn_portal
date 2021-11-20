import React from "react";

import { parseTree } from ".";
import { ITree } from "./types";

// todo
const baseRenderer =
  (Component: any) =>
  (cmp: ITree): React.ReactNode => {
    return (
      <Component key={cmp.key} {...cmp.props}>
        {parseTree(cmp.children)}
      </Component>
    );
  };

export default baseRenderer;
