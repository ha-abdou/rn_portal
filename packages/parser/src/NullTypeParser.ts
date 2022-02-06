import { TFiberParser } from '.'

const typeName = 'NullType'
const stringTypeName = 'String'
const arrayTypeName = 'Array'

const parser: TFiberParser = async (fiber, Walker) => {
  // string value
  if (!fiber.child && typeof fiber.memoizedProps === 'string') {
    return {
      type: { name: stringTypeName },
      fiberDebug: fiber._debugSource,
      key: fiber.key,
      options: {
        value: fiber.memoizedProps,
      },
    }
  }
  if (fiber.child && Array.isArray(fiber.memoizedProps)) {
    return {
      type: { name: arrayTypeName },
      fiberDebug: fiber._debugSource,
      key: fiber.key,
      children: await Walker(fiber.child),
    }
  }

  // todo handle this error
  return {
    type: { name: 'Component' },
    fiberDebug: fiber._debugSource,
    key: fiber.key,
    children: await Walker(fiber.child),
  }
}

const NullTypeParser = {
  type: null,
  parser,
  typeName,
}

export default NullTypeParser
