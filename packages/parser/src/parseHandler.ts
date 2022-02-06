import { defaultParser } from './defaultParser'
import NullTypeParser from './NullTypeParser'
import { IParser, TFiberNode, TFiberParser } from './types'

export const addFiberParser = (type: unknown, typeName: string, parser: TFiberParser): void => {
  Parsers.set(type, { type, typeName, parser })
}

const Parsers = new Map<unknown, IParser>()

addFiberParser(NullTypeParser.type, NullTypeParser.typeName, NullTypeParser.parser)

export const getFiberParser = (fiber: TFiberNode): TFiberParser => {
  let handler = Parsers.get(fiber.type)

  if (handler) {
    return handler.parser
  }
  // @ts-ignore if typeof ComponentSpec
  const name = fiber?.type?.render?.name

  handler = Parsers.get(name)

  if (handler) {
    return handler.parser
  }

  return defaultParser
}
