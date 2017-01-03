import {
  getEntryIdentifier,
  isReactClass,
  isReactFunction,
} from '../util'

const entriesVisitor = {
  'Class|Function'(path, state) {
    if (!isReactClass(path) && !isReactFunction(path)) return
    state.createEntry(getEntryIdentifier(path), path)
  },
}

export default entriesVisitor
