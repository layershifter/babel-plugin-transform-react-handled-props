import _ from 'lodash'
import * as t from 'babel-types'

const createPropertyExpression = (identifier, props) => {
  const entries = _.uniq(props).sort().map(prop => t.stringLiteral(prop))

  const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
  const right = t.arrayExpression(entries)

  return t.expressionStatement(t.assignmentExpression('=', left, right))
}

const findTarget = path => {
  if (t.isExportDeclaration(path.parent)) return path.findParent(parentPath => parentPath.isExportDeclaration())
  if (t.isExpression(path)) return path.findParent(parentPath => parentPath.isDeclaration())

  return path
}

const insertAfterPath = (path, expression) => findTarget(path).insertAfter(expression)

const insertEntries = entries => entries.forEach(({ identifier, path, props }) => {
  insertAfterPath(path, createPropertyExpression(identifier, props))
})

export default insertEntries
