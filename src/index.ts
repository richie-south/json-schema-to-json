import {compileSchema, JsonSchema, SchemaNode} from 'json-schema-library'

function walkCompiledNode(node: SchemaNode, built = {}): object {
  if (node.schema.properties && node.schema.type === 'object') {
    for (const key in node.schema.properties) {
      const {node: childNode} = node.getNode(key)
      if (childNode) {
        built = {
          ...built,
          [key]: walkCompiledNode(childNode),
        }
      }
    }
  }

  if (node.schema.type !== 'object' && node.schema.type !== 'array') {
    return node.schema.type
  }

  if (node.schema.items && node.schema.type === 'array') {
    const {node: itemNode} = node.getNode(0 as any)
    if (itemNode) {
      return [walkCompiledNode(itemNode.items as SchemaNode)]
    }
  }

  return built
}

export function getJsonStructure(schema: JsonSchema) {
  const data = compileSchema(schema)
  return walkCompiledNode(data)
}
