import * as t from 'babel-types'

import getBody from './getBody'
import hasReturnStatement from './hasReturnStatement'

const getRenderMethod = path => getBody(path).find(member => {
  return t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })
})

const hasSuperClass = ({ node: { superClass } }) => !!superClass

const hasValidRenderMethod = renderMethod => !!renderMethod && hasReturnStatement(renderMethod)

const isClass = path => t.isClassDeclaration(path) || t.isClassExpression(path)

const isReactClass = path => {
  return isClass(path) && hasSuperClass(path) && hasValidRenderMethod(getRenderMethod(path))
}

export default isReactClass
