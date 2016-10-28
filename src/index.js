export default function ({types: t}) {
  const props = []

  return {
    visitor: {
      ExpressionStatement(path) {
        path.traverse({
          AssignmentExpression(path) {
            if (
              path.node.left != null &&
              path.node.left.type === "MemberExpression" &&
              path.node.right != null &&
              path.node.right.type === "ObjectExpression"
            ) {
              const left = path.node.left

              if (
                left.property.type === "Identifier" &&
                left.property.name === "propTypes"
              ) {
                const right = path.node.right

                console.log(right.properties.length)
              }
            }
          }
        })
      },

      AssignmentExpression(path) {
        if (
          path.node.left != null &&
          path.node.left.type === "MemberExpression" &&
          path.node.right != null &&
          path.node.right.type === "ObjectExpression"
        ) {
          const left = path.node.left

          if (
            left.property.type === "Identifier" &&
            left.property.name === "_meta"
          ) {
            const right = path.node.right

           // console.log(right)
          }
        }
      }
    }
  }
}
