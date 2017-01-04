import _ from 'lodash'
import * as t from 'babel-types'

const createPropertyExpression = (identifier, props) => {
  const entries = _.uniq(props).sort().map(prop => t.stringLiteral(prop))

  const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
  const right = t.arrayExpression(entries)

  return t.expressionStatement(t.assignmentExpression('=', left, right))
}

const findTarget = path => {
  if (t.isArrowFunctionExpression(path) || t.isFunctionExpression(path)) {
    const declarationPath = path.findParent(parentPath => t.isVariableDeclaration(parentPath))

    return findTarget(declarationPath)
  }

  if (t.isExportDeclaration(path.parent)) return path.findParent(parentPath => t.isExportDeclaration(parentPath))
  if (t.isExpression(path)) return path.findParent(parentPath => t.isDeclaration(parentPath))

  return path
}

const insertAfterPath = (path, expression) => findTarget(path).insertAfter(expression)

const insertEntries = entries => entries.forEach(({ identifier, path, props }) => {
  insertAfterPath(path, createPropertyExpression(identifier, props))
})

export default insertEntries
