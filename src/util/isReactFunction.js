import * as t from 'babel-types'

const isFunction = path => {
  return t.isArrowFunctionExpression(path) || t.isFunctionDeclaration(path) || t.isFunctionExpression(path)
}

const isReactFunction = path => isFunction(path) // && hasReturnStatement(node)

export default isReactFunction
