import * as t from 'babel-types'

import getBody from './getBody'
import hasReturnStatement from './hasReturnStatement'

const isFunction = path => {
  return t.isArrowFunctionExpression(path) || t.isFunctionDeclaration(path) || t.isFunctionExpression(path)
}

const isReactFunction = path => isFunction(path) && hasReturnStatement(getBody(path))

export default isReactFunction
