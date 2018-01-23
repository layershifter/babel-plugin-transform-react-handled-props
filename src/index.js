import { entryVisitor, importVisitor, propVisitor } from './visitors'
import { appendProps, Store } from './util'

const plugin = () => ({
  manipulateOptions: (opts, parserOptions) => {
    parserOptions.plugins.push('classProperties')
    parserOptions.plugins.push('jsx')
    parserOptions.plugins.push('objectRestSpread')
    parserOptions.plugins.push('flow')
  },
  pre() {
    this.store = new Store()
  },
  visitor: {
    Program(programPath, { opts }) {
      programPath.traverse(importVisitor, this.store)

      if (!this.store.hasImport) return

      programPath.traverse(entryVisitor, this.store)
      programPath.traverse(propVisitor, this.store)

      appendProps(this.store.getEntries(), opts)
    },
  },
})

export default plugin
