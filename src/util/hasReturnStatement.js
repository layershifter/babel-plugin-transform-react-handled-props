import * as t from 'babel-types'

const hasReturnStatement = (node = {}) => {
  const body = getBody(node)

  const isArrowFunction = t.isArrowFunctionExpression(node)
  const hasBody = t.isBlockExpression(body)

  return (isArrowFunction && !hasBody) || getBody(node).some(member => t.isReturnStatement(member))
}
