export default function ({types: t}) {
  const visited = {}

  const getEntry = (name) => {
    if (!visited[name]) visited[name] = {
      name,
      handled: [],
      point: null,
    }

    return visited[name]
  }

  return {
    visitor: {
      Program(path) {
        path.traverse({
          AssignmentExpression(assignment) {
            const {left, right} = assignment.node

            if (!t.isMemberExpression(left) || !t.isObjectExpression(right)) return
            if (!t.isIdentifier(left.object)) return
            if (!t.isIdentifier(left.property, {name: 'propTypes'})) return

            const entry = getEntry(left.object.name)
            const {properties} = right

            properties.forEach(property => {
              entry.handled.push(property.key.name)
            })
          },
        })

        // path.traverse({
        //   AssignmentExpression(assignPath) {
        //     const { left, right } = assignPath.node
        //
        //     if (!t.isMemberExpression(left) || !t.isObjectExpression(right)) return
        //     if (!t.isIdentifier(left.property, { name: '_meta' })) return
        //
        //     const { properties } = right
        //
        //     const propsArray = t.arrayExpression(
        //       propsNames.map(propName => t.stringLiteral(propName))
        //     )
        //     const propsEntry = t.objectProperty(t.identifier('props'), propsArray)
        //
        //     properties.push(propsEntry)
        //   },
        // })
      },
    },
  }
}
