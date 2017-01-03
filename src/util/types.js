import * as t from 'babel-types'

export const isArrayValue = path => t.isArrayExpression(path)

export const isObjectValue = path => t.isObjectExpression(path)

export const isStaticProperty = ({ node }) => !!node.static
