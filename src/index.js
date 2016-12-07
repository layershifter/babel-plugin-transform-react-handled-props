import Store from './Store'

export default function ({ types: t }) {
  const isHandledPropsAssignment = (path) => {
    const { left, right } = path.node

    if (!t.isMemberExpression(left) || !t.isIdentifier(left.property, { name: 'handledProps' })) return false
    if (!t.isArrayExpression(right)) path.buildCodeFrameError('`handledProps` must be an array')

    return true
  }

  const isPropsAssigment = (path) => {
    const { left, right } = path.node

    if (!t.isMemberExpression(left) || !t.isIdentifier(left.property)) return false
    const { name } = left.property
    if (name !== 'defaultProps' && name !== 'propTypes') return false
    if (!t.isObjectExpression(right)) path.buildCodeFrameError('`defaultProps` and `propTypes` must be an array')

    return true
  }

  return {
    visitor: {
      Program(programPath) {
        const store = new Store()

        const generateExpression = (identifier) => {
          const props = store.get(identifier).map(prop => t.stringLiteral(prop))
          const left = t.memberExpression(t.identifier(identifier), t.identifier('handledProps'))
          const expression = t.assignmentExpression('=', left, t.arrayExpression(props))

          return t.expressionStatement(expression)
        }

        programPath.traverse({
          AssignmentExpression(path) {
            const {node} = path

            if(isHandledPropsAssignment(path)) {
              const { left, right } = node
              const { name: identifier } = left.object
              const { elements } = right

              elements.forEach(element => store.add(identifier, element.value))
              path.remove()

              return
            }

            if(isPropsAssigment(path)) {
              const {left, right} = node
              const {name: identifier} = left.object
              const {properties} = right

              properties.forEach(property => store.add(identifier, property.key.name))
            }
          },
          ClassProperty(path) {
            const { key, value } = path.node

            if (!path.node.static || !t.isIdentifier(key, { name: 'handledProps' })) return
            if (!t.isArrayExpression(value)) path.buildCodeFrameError('`handledProps` must be an array')

            const declaration = path.findParent(parentPath => parentPath.isClassDeclaration())
            const { name: identifier } = declaration.node.id
            const { elements } = value

            elements.forEach(element => store.add(identifier, element.value))
            path.remove()
          },
        })

        programPath.traverse({
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

            properties.forEach(property => store.add(identifier, property.key.name))
          },
        })

        programPath.traverse({
          ClassDeclaration(path) {
            const { name } = path.node.id

            if (!store.has(name)) return
            if (t.isExportDeclaration(path.parentPath)) path = path.parentPath

            path.insertAfter(generateExpression(name))
          },
          FunctionDeclaration(path) {
            const { name } = path.node.id

            if (!store.has(name)) return
            if (t.isExportDeclaration(path.parentPath)) path = path.parentPath
            path.insertAfter(generateExpression(name))
          },
        })
      },
    },
  }
}
