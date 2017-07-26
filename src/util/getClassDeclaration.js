import * as t from 'babel-types'

const getClassDeclaration = path => path.findParent(parentPath => {
  return t.isClassDeclaration(parentPath) || t.isClassExpression(parentPath)
})

export default getClassDeclaration
