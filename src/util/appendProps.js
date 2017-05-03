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

const insertAfterPath = (path, identifier, props) => {
  if(t.isClassDeclaration(path)) {
    const entries = _.uniq(props).sort().map(prop => t.stringLiteral(prop))
    const key = t.identifier('handledProps')
    const value = t.arrayExpression(entries)
    const prop = t.classProperty(key, value)
    prop.static = true;

    path.node.body.body.push(prop)

    return
  }

  return findTarget(path).insertAfter(createPropertyExpression(identifier, props))
}

const insertEntries = entries => entries.forEach(({ identifier, path, props }) => {
  insertAfterPath(path, identifier, props)
})

export default insertEntries
