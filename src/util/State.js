import _ from 'lodash'

export default class State {
  entries = {}
  hasImport = false

  create = (name, path) => {
    this.entries[name] = { path, props: [] }
  }

  has = name => _.has(this.props, name)
}
