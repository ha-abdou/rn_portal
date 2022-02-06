import { TFiberNode } from '..'

const getFiberTypeName = (fiber: TFiberNode): string => {
  // @ts-ignore
  return fiber.type?.name || fiber.type?.displayName
}

export default getFiberTypeName
