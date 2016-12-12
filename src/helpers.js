import * as t from 'babel-types'

export const findClassIdentifier = (path) => {
  const declaration = path.findParent(parentPath => parentPath.isClassDeclaration())
  return declaration.node.id.name
}

export const generateExpression = (store, identifier) => {
  const props = store.get(identifier).map(prop => t.stringLiteral(prop))
  const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
  const expression = t.assignmentExpression('=', left, t.arrayExpression(props))

  return t.expressionStatement(expression)
}
