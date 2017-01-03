import * as t from 'babel-types'

const hasReturnStatement = body => {
  if (t.isBlockStatement(body)) return body.some(member => t.isReturnStatement(member))
  return !!body
}

export default hasReturnStatement
