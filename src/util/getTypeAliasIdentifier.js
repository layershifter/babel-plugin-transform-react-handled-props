import _ from 'lodash'

const getTypeAliasIdentifier = path => {
  const body = _.get(path, 'parent.body') || []
  if (!body) {
    return
  }
  return _.get(body.find(item => item.type === 'ClassDeclaration'), 'id.name')
}

export default getTypeAliasIdentifier
