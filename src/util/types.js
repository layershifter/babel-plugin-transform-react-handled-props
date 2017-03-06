import * as t from 'babel-types'
import _ from 'lodash'

export const isArrayValue = path => t.isArrayExpression(path)

export const isObjectProperty = path => t.isObjectProperty(path)

export const isObjectValue = path => t.isObjectExpression(path)

export const isStaticProperty = ({ node }) => !!node.static

export const isValidExpression = ({ node: { left = {} } }, names) => {
  const { property } = left
  const { name } = property

  return t.isMemberExpression(left) && t.isIdentifier(property) && _.includes(names, name)
}

export const isValidProperty = (path, names) => {
  const { node: { key } } = path
  const { name } = key

  return t.isIdentifier(key) && _.includes(names, name)
}
