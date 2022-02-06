import Walker, { TFiberNode, TFiberParser } from '@rn_portal/parser'

type TCreateBaseParser = (
  typeName: string,
  getFirstChild: (fiber: TFiberNode) => TFiberNode | null | undefined,
) => TFiberParser

const createBaseParser: TCreateBaseParser = (typeName, getFirstChild) => async (fiber: TFiberNode, walker: Walker) => {
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
    children: child ? await walker(child) : null,
  }
}

export default createBaseParser
