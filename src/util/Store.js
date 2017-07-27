import _ from 'lodash'

export default class Store {
  entries = {}
  hasImport = false

  addProps = (name, newProps) => {
    this.entries[name].props = _.union(this.entries[name].props, newProps)
  }

  createEntry = (name, path) => {
    this.entries[name] = { path, props: [] }
  }

  getEntries = () => _.map(this.entries, ({ path, props }, identifier) => ({ identifier, path, props }))

  hasEntry = name => _.has(this.entries, name)
}
