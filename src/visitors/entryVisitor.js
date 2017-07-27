import { getEntryIdentifier, isReactComponent } from '../util'

const entriesVisitor = {
  'Class|Function': (path, state) => {
    if (!isReactComponent(path)) return
    state.createEntry(getEntryIdentifier(path), path)
  },
}

export default entriesVisitor
