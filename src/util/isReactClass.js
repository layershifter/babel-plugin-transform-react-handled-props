import * as t from 'babel-types'

import getBody from './getBody'
import hasReturnStatement from './hasReturnStatement'

const getRenderMethod = path => getBody(path).find(member => {
  return t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })
})

const hasSuperClass = ({ superClass }) => !!superClass

const isClass = node => t.isClassDeclaration(node) || t.isClassExpression(node)

const isReactClass = path => {
  const renderMethod = getRenderMethod(path)

  return isClass(path) && hasSuperClass(path) && !!renderMethod && hasReturnStatement(renderMethod)
}

export default isReactClass
