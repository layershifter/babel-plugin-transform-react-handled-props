import {
  isHandledAssignment,
  isHandledProperty,
  isPropsAssignment,
  isPropsProperty,
} from './assertions'
import { findClassIdentifier, generateExpression } from './helpers'
import Store from './Store'
import {
  getIdentifier,
  isReactClass,
  isReactFunction,
  isReactImport,
} from './util'

export default function ({ types: t }) {
  return {
    visitor: {
      Program(programPath) {
        let hasImport = false
        const store = new Store()

        programPath.traverse({
          ImportDeclaration(path) {
            if (isReactImport(path)) {
              hasImport = true
              path.stop()
            }
          },
        })

        if (!hasImport) return

        programPath.traverse({
          'Class|Function'(path) {
            if (isReactClass(path)) console.log(getIdentifier(path))
            if (isReactFunction(path)) console.log(getIdentifier(path))
          },
        })

        programPath.traverse({
          AssignmentExpression(path) {
            const { left, right } = path.node
            const { object, property } = left

            if (isHandledAssignment(path, { left, right, property })) {
              const { name: identifier } = object
              const { elements } = right

              elements.forEach(element => store.add(identifier, element.value))
              path.remove()

              return
            }

            if (isPropsAssignment(path, { left, right, property })) {
              const { name: identifier } = object
              const { properties } = right

              properties.forEach(item => store.add(identifier, item.key.name))
            }
          },
          ClassProperty(path) {
            const { key, value } = path.node

            if (isHandledProperty(path, { key, value })) {
              const { elements } = value

              elements.forEach(element => store.add(findClassIdentifier(path), element.value))
              path.remove()

              return
            }

            if (isPropsProperty(path, { key, value })) {
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
