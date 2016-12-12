import * as t from 'babel-types'

const expectStatic = (key, isStatic) => !isStatic && key.buildCodeFrameError(`'${key} must be defined as static`)

export const isHandledAssignment = (left, right, property) => {
  if (!t.isMemberExpression(left) || !t.isIdentifier(property, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(right)) right.buildCodeFrameError('`handledProps` must be an array')

  return true
}

export const isHandledProperty = (key, value, isStatic) => {
  if (!t.isIdentifier(key, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(value)) value.buildCodeFrameError('`handledProps` must be an array')
  expectStatic(key, isStatic)

  return true
}

export const isPropsAssignment = (left, right, property) => {
  if (!t.isMemberExpression(left)) return false
  if (!t.isIdentifier(property, { name: 'defaultProps' }) && !t.isIdentifier(property, { name: 'propTypes' })) {
    return false
  }
  if (!t.isObjectExpression(right)) right.buildCodeFrameError('`defaultProps` and `propTypes` must be an array')

  return true
}

export const isPropsProperty = (key, value, isStatic) => {
  if (!t.isIdentifier(key, { name: 'defaultProps' }) && !t.isIdentifier(key, { name: 'propTypes' })) return false
  if (!t.isObjectExpression(value)) value.buildCodeFrameError('`defaultProps` and `propTypes` must be object')
  expectStatic(key, isStatic)

  return true
}
