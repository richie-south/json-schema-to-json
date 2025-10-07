import {compileSchema, JsonSchema, SchemaNode} from 'json-schema-library'

type Options = {
  useExample?: boolean
}

const defaultOptions: Options = {
  useExample: false,
}

function getExample(node: SchemaNode) {
  if (node.schema.example) {
    return node.schema.example
  } else if (
    Array.isArray(node.schema.examples) &&
    node.schema.examples.length > 0
  ) {
    return node.schema.examples[0]
  }

  return node.schema.type
}

function walkCompiledNode(
  node: SchemaNode,
  built = {},
  options: Options = defaultOptions,
): object {
  if (node.schema.properties && node.schema.type === 'object') {
    for (const key in node.schema.properties) {
      const {node: childNode} = node.getNode(key)
      if (childNode) {
        built = {
          ...built,
          [key]: walkCompiledNode(childNode, {}, options),
        }
      }
    }
  }

  if (node.schema.type !== 'object' && node.schema.type !== 'array') {
    if (options.useExample) {
      return getExample(node)
    }

    return node.schema.type
  }

  if (node.schema.items && node.schema.type === 'array') {
    const {node: itemNode} = node.getNode(0 as any)
    if (itemNode) {
      return [walkCompiledNode(itemNode.items as SchemaNode, {}, options)]
    }
  }

  return built
}

export function getJsonStructure(
  schema: JsonSchema,
  options: Options = defaultOptions,
) {
  const data = compileSchema(schema)
  return walkCompiledNode(data, {}, options)
}
