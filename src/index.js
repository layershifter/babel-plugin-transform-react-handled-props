import {
  entryVisitor,
  importVisitor,
  propVisitor,
} from './visitors'
import { generateExpression } from './helpers'
import { State } from './util'

export default function ({ types: t }) {
  return {
    visitor: {
      Program(programPath) {
        const state = new State()

        programPath.traverse(importVisitor, state)

        if (state.hasImport) {
          programPath.traverse(entryVisitor, state)
          programPath.traverse(propVisitor, state)

          programPath.traverse({
            'ClassDeclaration|FunctionDeclaration'(path) {
              const { name } = path.node.id

              if (!store.has(name)) return
              if (t.isExportDeclaration(path.parentPath)) path = path.parentPath

              path.insertAfter(generateExpression(store, name))
            },
          })
        }
      },
    },
  }
}
