import _ from 'lodash'

export default function ({types: t}) {
  return {
    visitor: {
      Program(programPath) {
        const handledProps = {}

        const getHandledProps = (identifier) => {
          if (!handledProps[identifier]) handledProps[identifier] = []
          return handledProps[identifier]
        }

        const generateExpression = (identifier) => {
          const props = _.uniq(handledProps[identifier])
          const array = t.arrayExpression(props.map(name => t.stringLiteral(name)))

          return t.objectProperty(t.identifier('handledProps'), array)
        }

        programPath.traverse({
          AssignmentExpression(path) {
            const {left, right} = path.node

            if (!t.isMemberExpression(left) || !t.isIdentifier(left.property, {name: 'handledProps'})) return
            if (!t.isArrayExpression(right)) path.buildCodeFrameError('`handledProps` must be an array')

            const {name: identifier} = left.object
            const {elements} = right
            const handledProps = getHandledProps(identifier)

            elements.forEach(element => handledProps.push(element.value))
          },
        })

        programPath.traverse({
          AssignmentExpression(path) {
            const {left, right} = path.node

            if (!t.isMemberExpression(left)) return
            if (!t.isIdentifier(left.property)) return

            const {name} = left.property

            if (name !== 'defaultProps' && name !== 'propTypes') return
            if (!t.isObjectExpression(right)) path.buildCodeFrameError('`handledProps` must be an array')

            const {name: identifier} = left.object
            const {properties} = right
            const handledProps = getHandledProps(identifier)

            properties.forEach(property => handledProps.push(property.key.name))
          },
        })

        programPath.traverse({
          FunctionDeclaration(path) {
            const {name} = path.node.id

            if (handledProps.hasOwnProperty(name)) return
            path.insertAfter(generateExpression(name))
          },
        })
      },
    },
  }
}
