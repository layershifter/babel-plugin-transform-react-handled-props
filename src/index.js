import {
  entryVisitor,
  importVisitor,
  propVisitor,
} from './visitors'
import { appendProps, Store } from './util'

const plugin = () => ({
  pre() {
    this.store = new Store()
  },
  visitor: {
    Program(programPath) {
      programPath.traverse(importVisitor, this.store)

      if (!this.store.hasImport) return

      programPath.traverse(entryVisitor, this.store)
      programPath.traverse(propVisitor, this.store)

      appendProps(this.store.getEntries())
    },
  },
})

export default plugin
