import {
  entryVisitor,
  importVisitor,
  propVisitor,
} from './visitors'
import {
  createPropertyExpression,
  insertAfterPath,
  Store,
} from './util'

const insertEntries = entries => entries.forEach(({ identifier, path, props }) => {
  insertAfterPath(path, createPropertyExpression(identifier, props))
})

const plugin = () => {
  return {
    pre() {
      this.store = new Store()
    },
    visitor: {
      Program(programPath) {
        programPath.traverse(importVisitor, this.store)

        if (!this.store.hasImport) return

        programPath.traverse(entryVisitor, this.store)
        programPath.traverse(propVisitor, this.store)

        insertEntries(this.store.getEntries())
      },
    },
  }
}

export default plugin
