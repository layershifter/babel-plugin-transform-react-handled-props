import * as t from 'babel-types'
import _ from 'lodash'

import getVariableDeclarator from './getVariableDeclarator'

const getPositionIdentifier = ({ node }) => _.get(node, 'id.name', `${node.start}:${node.end}`)

const getFunctionIdentifier = (path) => {
  if (t.isFunctionDeclaration(path)) return getPositionIdentifier(path)
  if (t.isArrowFunctionExpression(path) || t.isFunctionExpression(path)) {
    return getPositionIdentifier(getVariableDeclarator(path))
  }

  throw path.buildCodeFrameError('`path` is unsupported Function definition')
}

const getEntryIdentifier = (path) => {
  if (t.isClass(path)) return getPositionIdentifier(path)
  if (t.isFunction(path)) return getFunctionIdentifier(path)

  throw path.buildCodeFrameError('`path` must be Class or Function definition')
}

export default getEntryIdentifier
