import { isReactImport } from '../util'

const importVisitor = {
  ImportDeclaration(path, state) {
    if (!isReactImport(path)) return

    state.hasImport = true
    path.stop()
  },
}

export default importVisitor
