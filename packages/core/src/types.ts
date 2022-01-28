import { IParsedFiber } from '@rn_portal/parser'

export type TViewPort = { xo: number; yo: number; width: number; height: number; x: number; y: number }

export type ICaptureResult = {
  viewport: TViewPort
  dt: number
  tree: IParsedFiber[] | null
}
