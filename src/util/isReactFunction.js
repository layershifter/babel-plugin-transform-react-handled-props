import * as t from 'babel-types'

import getBody from './getBody'
import hasReturnStatement from './hasReturnStatement'

const isFunction = path => {
  if (t.isFunctionDeclaration(path)) return true
  if (!t.isArrowFunctionExpression(path) && !t.isFunctionExpression(path)) return false

  return t.isVariableDeclarator(path.parent)
}

const isReactFunction = path => isFunction(path) && hasReturnStatement(getBody(path))

export default isReactFunction
