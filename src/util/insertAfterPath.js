import * as t from 'babel-types'

const findTarget = path => {
  if (t.isExportDeclaration(path.parent)) return path.findParent(parentPath => parentPath.isExportDeclaration())
  if (t.isExpression(path)) return path.findParent(parentPath => parentPath.isDeclaration())

  return path
}

const insertAfterPath = (path, expression) => findTarget(path).insertAfter(expression)

export default insertAfterPath
