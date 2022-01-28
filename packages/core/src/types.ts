export interface TWalkerOptions {
  escapeSibling?: boolean
}

export interface IFiberDebug {
  columnNumber: number
  fileName: string
  lineNumber: number
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

export type TViewPort = { xo: number; yo: number; width: number; height: number; x: number; y: number }

export type ICaptureResult = {
  viewport: TViewPort
  dt: number
  tree: IParsedFiber[] | null
}
