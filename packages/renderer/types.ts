import { IParsedFiber } from '../parser/types'

export type TFiberWithoutExtra = Omit<IParsedFiber, 'walkerOptionsForNextSibling'>
export interface ITree extends TFiberWithoutExtra {
  children?: TFiberWithoutExtra[] | null
}
