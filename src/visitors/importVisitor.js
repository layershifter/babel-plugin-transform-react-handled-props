import { isReactImport } from '../util'

const importVisitor = {
  ImportDeclaration(path, state) {
    if (!isReactImport(path)) return

    state.hasImport = true // eslint-disable-line no-param-reassign
    path.stop()
  },
}

export default importVisitor
