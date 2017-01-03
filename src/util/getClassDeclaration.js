import * as t from 'babel-types'

const getClassDeclaration = path => path.findParent(parentPath => t.isClassDeclaration(parentPath))

export default getClassDeclaration
