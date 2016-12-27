import * as t from 'babel-types'

const expectStatic = (path, { key, isStatic }) => !isStatic && path.buildCodeFrameError(`'${key} must be defined as static`)

export const isHandledAssignment = (path, { left, right, property }) => {
  if (!t.isMemberExpression(left) || !t.isIdentifier(property, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(right)) throw path.buildCodeFrameError('`handledProps` must be an array')

  return true
}

export const isHandledProperty = (path, { key, value }) => {
  if (!t.isIdentifier(key, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(value)) throw path.buildCodeFrameError('`handledProps` must be an array')

  expectStatic(path, { key, isStatic: path.node.static })

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

export const isPropsProperty = (path, { key, value }) => {
  if (!t.isIdentifier(key, { name: 'defaultProps' }) && !t.isIdentifier(key, { name: 'propTypes' })) return false
  if (!t.isObjectExpression(value)) throw path.buildCodeFrameError('`defaultProps` and `propTypes` must be an object')

  expectStatic(path, { key, isStatic: path.node.static })

  return true
}
