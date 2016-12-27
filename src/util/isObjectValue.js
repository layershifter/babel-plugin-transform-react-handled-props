import * as t from 'babel-types'

const isObjectValue = path => t.isObjectExpression(path)

export default isObjectValue
