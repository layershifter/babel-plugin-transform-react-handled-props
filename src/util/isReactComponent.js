import * as t from 'babel-types'

const containsJSX = path => {
  if (t.isJSXElement(path)) return true
  let containJSX

  path.traverse({
    JSXElement(jsxPath) {
      containJSX = true
      jsxPath.stop()
    },
  })

  return containJSX
}

const hasRenderMethod = ({ node: { body: { body } } }) => body.some(member => {
  return t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })
})

const hasSuperClass = ({ node: { superClass } }) => !!superClass

export const isClass = path => t.isClassDeclaration(path) || t.isClassExpression(path)

const isFunction = path => {
  if (t.isFunctionDeclaration(path)) return true
  if (!t.isArrowFunctionExpression(path) && !t.isFunctionExpression(path)) return false

  return t.isVariableDeclarator(path.parent)
}

const isReactClass = path => isClass(path) && hasSuperClass(path) && hasRenderMethod(path)

const isReactFunction = path => isFunction(path) && containsJSX(path.get('body'))

const isReactComponent = path => isReactClass(path) || isReactFunction(path)

export default isReactComponent

