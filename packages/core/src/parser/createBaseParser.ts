import { TFiberNode, TFiberParser } from '@portal/parser'

const createBaseParser: (
  typeName: string,
  getFirstChild: (fiber: TFiberNode) => TFiberNode | null | undefined,
) => TFiberParser = (typeName, getFirstChild) => async (fiber, Walker) => {
  const child = getFirstChild(fiber)
  const props = {
    ...fiber.memoizedProps,
    children: undefined,
  }
  delete props.children

  return {
    type: { name: typeName },
    fiberDebug: fiber._debugSource,
    props,
    key: fiber.key,
    children: child ? await Walker(child) : null,
  }
}

export default createBaseParser
