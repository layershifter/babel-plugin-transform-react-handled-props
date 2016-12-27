import {
  getIdentifier,
  isReactClass,
  isReactFunction,
} from '../util'

const entriesVisitor = {
  'Class|Function'(path, state) {
    if (isReactClass(path) || isReactFunction(path)) state.create(getIdentifier(path), path)
  },
}

export default entriesVisitor
