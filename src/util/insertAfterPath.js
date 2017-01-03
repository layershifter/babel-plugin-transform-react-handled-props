import * as t from 'babel-types'

const insertAfterPath = (path, expression) => {
  if (t.isExportDeclaration(path.parent)) {
    const parent = path.findParent(parentPath => parentPath.isExportDeclaration())

    parent.insertAfter(expression)
    return
  }

  path.insertAfter(expression)
}

export default insertAfterPath
