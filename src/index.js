import {
  isHandledAssignment,
  isHandledProperty,
  isPropsAssignment,
  isPropsProperty,
} from './assertions'
import { findClassIdentifier, generateExpression } from './helpers'
import Store from './Store'

export default function ({ types: t }) {
  return {
    visitor: {
      Program(programPath) {
        const store = new Store()

        programPath.traverse({
          AssignmentExpression(path) {
            const { left, right } = path.node
            const { object, property } = left
            const { name: identifier } = object

            if (isHandledAssignment(left, right, property)) {
              const { elements } = right

              elements.forEach(element => store.add(identifier, element.value))
              path.remove()

              return
            }

            if (isPropsAssignment(left, right, property)) {
              const { properties } = right
              properties.forEach(item => store.add(identifier, item.key.name))
            }
          },
          ClassProperty(path) {
            const { key, value } = path.node

            if (isHandledProperty(key, value, path.node.static)) {
              const { elements } = value

              elements.forEach(element => store.add(findClassIdentifier(path), element.value))
              path.remove()

              return
            }

            if (isPropsProperty(key, value, path.node.static)) {
              const { properties } = value
              properties.forEach(property => store.add(findClassIdentifier(path), property.key.name))
            }
          },
        })

        programPath.traverse({
          'ClassDeclaration|FunctionDeclaration'(path) {
            const { name } = path.node.id

            if (!store.has(name)) return
            if (t.isExportDeclaration(path.parentPath)) path = path.parentPath

            path.insertAfter(generateExpression(store, name))
          },
        })
      },
    },
  }
}
