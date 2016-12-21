import * as t from 'babel-types'

// const getBody = ({body = {body: []}}) => body.body
//
// const getRenderMethod = node => getBody(node).find(({key}) => t.isIdentifier(key, {name: 'render'}))
//
// const hasReturnStatement = (node = {}) => {
//   const body = getBody(node)
//
//   const isArrowFunction = t.isArrowFunctionExpression(node)
//   const hasBody = t.isBlockExpression(body)
//
//   return (isArrowFunction && !hasBody) || getBody(node).some(member => t.isReturnStatement(member));
// }
//
// const isClass = node => t.isClassDeclaration(node) || t.isClassExpression(node)
//
// const isFunction = node => {
//   return t.isFunctionDeclaration(node) || t.isFunctionExpression(node) || t.isArrowFunctionExpression(node)
// }
//
// export const isReactFunction = node => isFunction(node) && hasReturnStatement(node)
//
// export const isReactClass = node => {
//   const renderMethod = getRenderMethod(node)
//
//   return isClass(node) && !!renderMethod && hasReturnStatement(renderMethod)
// }

export const isReactImport = ({node: {source}}) => t.isStringLiteral(source, {value: 'react'})

const expectStatic = (path, {key, isStatic}) => !isStatic && path.buildCodeFrameError(`'${key} must be defined as static`)

export const isHandledAssignment = (path, {left, right, property}) => {
  if (!t.isMemberExpression(left) || !t.isIdentifier(property, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(right)) throw path.buildCodeFrameError('`handledProps` must be an array')

  return true
}

export const isHandledProperty = (path, {key, value}) => {
  if (!t.isIdentifier(key, { name: 'handledProps' })) return false
  if (!t.isArrayExpression(value)) throw path.buildCodeFrameError('`handledProps` must be an array')

  expectStatic(path, {key, isStatic: path.node.static})

  return true
}

export const isPropsAssignment = (path, {left, right, property}) => {
  if (!t.isMemberExpression(left)) return false
  if (!t.isIdentifier(property, { name: 'defaultProps' }) && !t.isIdentifier(property, { name: 'propTypes' })) {
    return false
  }
  if (!t.isObjectExpression(right)) throw path.buildCodeFrameError('`defaultProps` and `propTypes` must be an object')

  return true
}

export const isPropsProperty = (path, {key, value}) => {
  if (!t.isIdentifier(key, { name: 'defaultProps' }) && !t.isIdentifier(key, { name: 'propTypes' })) return false
  if (!t.isObjectExpression(value)) throw path.buildCodeFrameError('`defaultProps` and `propTypes` must be an object')

  expectStatic(path, {key, isStatic: path.node.static})

  return true
}
