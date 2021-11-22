import React from 'react'
import Walker from './walker'

interface IDefaultPorps {
  // todo children type
  children: unknown | Array<unknown>
  [key: string]: unknown
}

export interface TFiberNode<
  Props = IDefaultPorps,
  State = { [key: string]: unknown },
  // todo correct type
  Type = React.ComponentSpec<Props, State>,
> {
  alternate: TFiberNode | null
  child: TFiberNode | null
  return: TFiberNode | null
  sibling: TFiberNode | null
  _debugOwner: TFiberNode | null
  type: Type | null
  elementType: Type
  memoizedProps: Props
  memoizedState: State
  pendingProps: Props
  key: null | string
  tag: number
  actualDuration: number
  actualStartTime: number
  childLanes: number
  flags: number
  index: number
  lanes: number
  mode: number
  selfBaseDuration: number
  subtreeFlags: number
  deletions: Array<TFiberNode> | null
  treeBaseDuration: number
  _debugNeedsRemount: boolean
  _debugSource: IFiberDebug

  dependencies: unknown
  ref: unknown
  stateNode: unknown
  updateQueue: unknown
  _debugHookTypes: unknown
}

export interface IFiberDebug {
  columnNumber: number
  fileName: string
  lineNumber: number
}

export interface IParser {
  type: unknown
  typeName: string
  parser: TFiberParser
}

export interface IParsedFiber<Options = { [key: string]: unknown }> {
  type: {
    name: string
    displayName?: string
  }
  fiberDebug: IFiberDebug
  key: null | string
  props?: { [key: string]: unknown }
  children?: IParsedFiber[] | null
  options?: Options
  walkerOptionsForNextSibling?: TWalkerOptions
}

export type TFiberParser<
  Props = IDefaultPorps,
  State = { [key: string]: unknown },
  // todo correct type
  Type = React.ComponentSpec<Props, State>,
> = (fiber: TFiberNode<Props, State, Type>, walker: Walker) => Promise<IParsedFiber>

export interface TWalkerOptions {
  escapeSibling?: boolean
}
