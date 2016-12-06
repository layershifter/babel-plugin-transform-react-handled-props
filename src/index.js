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
          const handled = _.uniq(handledProps[identifier])
          const props = handled.map(prop => t.stringLiteral(prop))
          const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))

          return t.assignmentExpression('=', left, t.arrayExpression(props))
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
        })

        programPath.traverse({
          AssignmentExpression(path) {
            const { left, right } = path.node

            if (!t.isMemberExpression(left)) return
            if (!t.isIdentifier(left.property)) return

            const { name } = left.property

            if (name !== 'defaultProps' && name !== 'propTypes') return
            if (!t.isObjectExpression(right)) path.buildCodeFrameError('`handledProps` must be an array')

            const { name: identifier } = left.object
            const { properties } = right

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
