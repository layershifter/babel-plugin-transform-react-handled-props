const getClassDeclaration = path => {
  const declaration = path.findParent(parentPath => parentPath.isClassDeclaration())

  return declaration.node.id.name
}

export default getClassDeclaration
