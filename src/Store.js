import _ from 'lodash'

export default class Store {
  props = {}

  add = (name, property) => {
    if (!this.has(name)) this.props[name] = []
    this.props[name].push(property)
  }

  has = name => _.has(this.props, name)

  get = name => _.uniq(this.props[name]).sort()
}
