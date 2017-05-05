import * as t from 'babel-types'

export const isHandledAssignment = (path, { left, right, property }) => {
  if (!t.isMemberExpression(left) || !t.isIdentifier(property, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(right)) throw path.buildCodeFrameError('`handledProps` must be an array')

  return true
}

export const isPropsAssignment = (path, { left, right, property }) => {
  if (!t.isMemberExpression(left)) return false
  if (!t.isIdentifier(property, { name: 'defaultProps' }) && !t.isIdentifier(property, { name: 'propTypes' })) {
    return false
  }
  if (!t.isObjectExpression(right)) throw path.buildCodeFrameError('`defaultProps` and `propTypes` must be an object')

  return true
}
