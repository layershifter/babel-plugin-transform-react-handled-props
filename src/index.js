export default function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const propsNames = []

        path.traverse({
          AssignmentExpression(assignPath) {
            const { left, right } = assignPath.node

            if (!t.isMemberExpression(left) || !t.isObjectExpression(right)) return
            if (!t.isIdentifier(left.property, { name: 'propTypes' })) return

            const { properties } = right

            properties.forEach(property => {
              if (t.isObjectProperty(property)) propsNames.push(property.key.name)
            })
          },
        })

        path.traverse({
          AssignmentExpression(assignPath) {
            const { left, right } = assignPath.node

            if (!t.isMemberExpression(left) || !t.isObjectExpression(right)) return
            if (!t.isIdentifier(left.property, { name: '_meta' })) return

            const { properties } = right

            const propsArray = t.arrayExpression(
              propsNames.map(propName => t.stringLiteral(propName))
            )
            const propsEntry = t.objectProperty(t.identifier('props'), propsArray)

            properties.push(propsEntry)
          },
        })
      },
    },
  }
}
