import _ from 'lodash'
import * as t from 'babel-types'

const createPropertyExpression = (identifier, props) => {
  const entries = _.uniq(props).sort().map(prop => t.stringLiteral(prop))

  const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
  const right = t.arrayExpression(entries)

  return t.expressionStatement(t.assignmentExpression('=', left, right))
}

export default createPropertyExpression
