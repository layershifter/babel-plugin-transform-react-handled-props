import * as t from 'babel-types'

import hasReturnStatement from './hasReturnStatement'
import getBody from './getBody'

const isFunction = path => {
  return t.isArrowFunctionExpression(path) || t.isFunctionDeclaration(path) || t.isFunctionExpression(path)
}

const isReactFunction = path => isFunction(path) && hasReturnStatement(getBody(path))

export default isReactFunction
