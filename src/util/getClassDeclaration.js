import * as t from 'babel-types'

const isClassDeclaration = path => t.isClassDeclaration(path) || t.isClassExpression(path)

const getClassDeclaration = path => path.findParent(isClassDeclaration)

export default getClassDeclaration
