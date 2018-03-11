import * as t from 'babel-types'
import _ from 'lodash'

import { isObjectProperty } from './types'

const getObjectKey = ({ key }) => (t.isStringLiteral(key) ? key.value : key.name)

const getObjectKeys = ({ properties }) => {
  const objectProperties = _.filter(properties, isObjectProperty)

  return _.map(objectProperties, getObjectKey)
}

export default getObjectKeys
