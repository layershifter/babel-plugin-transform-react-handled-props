import _ from 'lodash'
import * as t from 'babel-types'

const createEntriesArray = props => {
  const entries = _.uniq(props).sort().map(prop => t.stringLiteral(prop))

  return t.arrayExpression(entries)
}

export const createFunctionProperty = (identifier, props) => {
  const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
  const right = createEntriesArray(props)

  return t.expressionStatement(t.assignmentExpression('=', left, right))
}

export const createClassProperty = (identifier, props) => {
  const key = t.identifier('handledProps')
  const value = createEntriesArray(props)
  const property = t.classProperty(key, value)
  property.static = true

  return property
}
