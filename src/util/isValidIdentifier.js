import * as t from 'babel-types'
import _ from 'lodash'

const isValidIdentifier = (path, names) => {
  const { node: { key: { name } } } = path

  return t.isIdentifier(path) && _.contains(names, name)
}

export default isValidIdentifier
