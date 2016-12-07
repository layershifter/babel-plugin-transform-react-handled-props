import _ from 'lodash'

export default function ({ types: t }) {
  return {
    visitor: {
      Program(programPath) {
        const handledProps = {}

        const addProps = (identifier, prop) => {
          if (!handledProps[identifier]) handledProps[identifier] = []
          handledProps[identifier].push(prop)
        }

        const generateExpression = (identifier) => {
          const handled = _.uniq(handledProps[identifier]).sort()

          const props = handled.map(prop => t.stringLiteral(prop))
          const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
          const expression = t.assignmentExpression('=', left, t.arrayExpression(props))

          return t.expressionStatement(expression)
        }

        programPath.traverse({
          AssignmentExpression(path) {
            const { left, right } = path.node

            if (!t.isMemberExpression(left) || !t.isIdentifier(left.property, { name: 'handledProps' })) return
            if (!t.isArrayExpression(right)) path.buildCodeFrameError('`handledProps` must be an array')

            const { name: identifier } = left.object
            const { elements } = right

            elements.forEach(element => addProps(identifier, element.value))
            path.remove()
          },
          ClassProperty(path) {
            const { key, value } = path.node

            if (!path.node.static || !t.isIdentifier(key, { name: 'handledProps' })) return
            if (!t.isArrayExpression(value)) path.buildCodeFrameError('`handledProps` must be an array')

            const declaration = path.findParent(parentPath => parentPath.isClassDeclaration())
            const { name: identifier } = declaration.node.id
            const { elements } = value

            elements.forEach(element => addProps(identifier, element.value))
            path.remove()
          },
        })

        programPath.traverse({
          AssignmentExpression(path) {
            const { left, right } = path.node

            if (!t.isMemberExpression(left)) return
            if (!t.isIdentifier(left.property)) return

            const { name } = left.property

            if (name !== 'defaultProps' && name !== 'propTypes') return
            if (!t.isObjectExpression(right)) {
              path.buildCodeFrameError(
              '`defaultProps` and `propTypes` must be an array'
            )}

            const { name: identifier } = left.object
            const { properties } = right

            properties.forEach(property => addProps(identifier, property.key.name))
          },
          ClassProperty(path) {
            const { key, value } = path.node
            const { name } = key

            if (!path.node.static || (name !== 'defaultProps' && name !== 'propTypes')) return
            if (!t.isArrayExpression(value)) {
              path.buildCodeFrameError(
              '`defaultProps` and `propTypes` must be an array'
            )}

            const declaration = path.findParent(parentPath => parentPath.isClassDeclaration())
            const { name: identifier } = declaration.node.id
            const { properties } = value

            properties.forEach(property => addProps(identifier, property.key.name))
          },
        })

        programPath.traverse({
          ClassDeclaration(path) {
            const { name } = path.node.id

            if (!handledProps.hasOwnProperty(name)) return
            if (t.isExportDefaultDeclaration(path.parentPath)) path = path.parentPath

            path.insertAfter(generateExpression(name))
          },
          FunctionDeclaration(path) {
            const { name } = path.node.id

            if (!handledProps.hasOwnProperty(name)) return
            if (t.isExportNamedDeclaration(path.parentPath)) path = path.parentPath
            path.insertAfter(generateExpression(name))
          },
        })
      },
    },
  }
}
