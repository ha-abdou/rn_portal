import { IParsedFiber } from '@rn_portal/core'

export type TFiberWithoutExtra = Omit<IParsedFiber, 'walkerOptionsForNextSibling'>
export interface ITree extends TFiberWithoutExtra {
  children?: TFiberWithoutExtra[] | null
}

export type TParsedFiberRenderer = (cmp: ITree) => React.ReactNode
