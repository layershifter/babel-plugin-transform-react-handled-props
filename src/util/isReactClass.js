import * as t from 'babel-types'

const isClass = node => t.isClassDeclaration(node) || t.isClassExpression(node)

const isReactClass = path => {
  //  const renderMethod = getRenderMethod(path)

  return isClass(path) // && !!renderMethod && hasReturnStatement(renderMethod)
}

export default isReactClass
