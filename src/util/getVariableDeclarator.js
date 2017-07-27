import * as t from 'babel-types'

const getVariableDeclarator = path => path.findParent(parentPath => t.isVariableDeclarator(parentPath))

export default getVariableDeclarator
