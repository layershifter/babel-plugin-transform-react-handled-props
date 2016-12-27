import * as t from 'babel-types'

const isArrayValue = path => t.isArrayExpression(path)

export default isArrayValue
