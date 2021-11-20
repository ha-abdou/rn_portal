import { defaultParser } from "./defaultParser";
import { IParser, TFiberNode, TFiberParser } from "./types";

const Parsers = new Map<unknown, IParser>();

export const getFiberParser = (fiber: TFiberNode | null | undefined) => {
  let handler = Parsers.get(fiber.type);

  if (handler) {
    return handler.parser;
  }
  const name = fiber?.type?.render?.name;
  handler = Parsers.get(name);

  if (handler) {
    return handler.parser;
  }

  return defaultParser;
};

export const addFiberParser = (
  type: unknown,
  typeName: string,
  parser: TFiberParser
) => {
  Parsers.set(type, { type, typeName, parser });
};
