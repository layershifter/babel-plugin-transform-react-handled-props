import * as t from 'babel-types'
import _ from 'lodash'

const isValidExpression = ({ node: { left } }, names) => {
  if (!t.isMemberExpression(left)) return false

  const { property } = left
  const { name } = property

  return t.isIdentifier(property) && _.includes(names, name)
}

export default isValidExpression
