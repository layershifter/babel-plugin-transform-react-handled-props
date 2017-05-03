import * as t from 'babel-types'

import { createFunctionProperty, createClassProperty } from './createExpressions'
import { isClass } from './isReactComponent'

const findTarget = path => {
  if (t.isArrowFunctionExpression(path) || t.isFunctionExpression(path)) {
    const declarationPath = path.findParent(parentPath => t.isVariableDeclaration(parentPath))

    return findTarget(declarationPath)
  }

  if (t.isExportDeclaration(path.parent)) return path.findParent(parentPath => t.isExportDeclaration(parentPath))
  if (t.isExpression(path)) return path.findParent(parentPath => t.isDeclaration(parentPath))

  return path
}

const pushToClassBody = ({ node: { body: { body } } }, expression) => body.push(expression)

const insertAfterPath = (path, identifier, props) => {
  if (isClass(path)) {
    pushToClassBody(path, createClassProperty(identifier, props))

    return
  }

  findTarget(path).insertAfter(createFunctionProperty(identifier, props))
}

const insertEntries = entries => entries.forEach(({ identifier, path, props }) => {
  insertAfterPath(path, identifier, props)
})

export default insertEntries
