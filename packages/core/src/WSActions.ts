import { ICaptureResult } from './types'

const REQUEST_CAPTURE = '[REQUEST] [CAPTURE]'
export const wsRequestCaptureAction = () => JSON.stringify({ type: REQUEST_CAPTURE })
export const isWSRequestCaptureAction = (type: string) => type === REQUEST_CAPTURE

const NEW_CAPTURE = '[NEW] [CAPTURE]'
export const wsNewCaptureAction = (payload: ICaptureResult) => JSON.stringify({ type: NEW_CAPTURE, payload })
export const isWSNewCaptureAction = (type: string) => type === NEW_CAPTURE
