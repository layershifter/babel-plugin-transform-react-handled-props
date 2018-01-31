import * as t from 'babel-types'
import _ from 'lodash'

const getFlowTypeKeys = path => {
  const properties = _.get(path, 'node.right.properties', [])
  const keys = _.map(properties, item => {
    if (t.isStringLiteral(item.key)) return _.get(item, 'key.value')
    if (t.isIdentifier(item.key)) return _.get(item, 'key.name')
  })

  return _.filter(keys, _.identity)
}

export default getFlowTypeKeys
