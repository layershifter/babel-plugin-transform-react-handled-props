import { has, uniq } from 'lodash'

export default class Store {
  props = {}

  add = (name, property) => {
    if (!this.has(name)) this.props[name] = []
    this.props[name].push(property)
  }

  has = name => has(this.props, name)

  get = name => uniq(this.props[name]).sort()
}
