import { getFiberParser } from './parseHandler'
import { IParsedFiber, TFiberNode, TWalkerOptions } from './types'

type TWalkerReturn = Promise<IParsedFiber[] | null>

const Walker = async (fiber: TFiberNode | null | undefined, options: TWalkerOptions = {}): TWalkerReturn => {
  try {
    if (!fiber) return null
    const { escapeSibling } = options
    const handler = getFiberParser(fiber)
    const { walkerOptionsForNextSibling, ...parsedFiber } = await handler(fiber, Walker)

    if (parsedFiber) {
      if (fiber.sibling && walkerOptionsForNextSibling?.escapeSibling !== true && escapeSibling !== true) {
        const parsedSibling = await Walker(fiber.sibling)

        return [parsedFiber, ...(parsedSibling || [])]
      }
      return [parsedFiber]
    }
    if (fiber.sibling && escapeSibling !== true) {
      return await Walker(fiber.sibling)
    }
    return []
  } catch (e) {
    // todo error
    console.error('Walker Error: ', e)
    return null
  }
}

type Walker = typeof Walker

export default Walker
