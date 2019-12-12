import { getEntryIdentifier, isReactComponent, UnnamedClass } from '../util'

const entriesVisitor = {
  'Class|Function': (path, state) => {
    if (isReactComponent(path)) {
      const entryIdentifier = getEntryIdentifier(path)

      if (entryIdentifier || entryIdentifier === UnnamedClass) {
        state.createEntry(entryIdentifier, path)
      }
    }
  },
}

export default entriesVisitor
