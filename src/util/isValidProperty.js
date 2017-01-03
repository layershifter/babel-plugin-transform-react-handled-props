import * as t from 'babel-types'
import _ from 'lodash'

const isValidProperty = (path, names) => {
  const { node: { key } } = path
  const { name } = key

  return t.isIdentifier(key) && _.includes(names, name)
}

export default isValidProperty
