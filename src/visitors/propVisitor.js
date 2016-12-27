import _ from 'lodash'
import {
  getClassDeclaration,
  getIdentifier,
  isArrayValue,
  isObjectValue,
  isStaticProperty,
  isValidIdentifier,
} from '../util'

const getArrayItems = ({ elements }) => _.map(elements, ({ value }) => value)

const getObjectKeys = ({ properties }) => _.map(properties, ({ key: { name } }) => name)

const propVisitor = {
  AssignmentExpression(path) {
    const { left, right } = path.node
    const { object, property } = left

    if (isHandledAssignment(path, { left, right, property })) {
      const { name: identifier } = object
      const { elements } = right

      elements.forEach(element => store.add(identifier, element.value))
      path.remove()

      return
    }

    if (isPropsAssignment(path, { left, right, property })) {
      const { name: identifier } = object
      const { properties } = right

      properties.forEach(item => store.add(identifier, item.key.name))
    }
  },
  ClassProperty(path, state) {
    const identifier = getIdentifier(getClassDeclaration(path))
    const { node: { value } } = path

    if (!state.has(identifier) || !isStaticProperty(path)) return

    if (isValidIdentifier(path, ['handleProps']) && isArrayValue(value)) {
      state.add(identifier, getArrayItems(value))
      path.remove()

      return
    }

    if (isValidIdentifier(path, ['defaultProps', 'propTypes']) && isObjectValue(value)) {
      state.add(identifier, getObjectKeys(value))
    }
  },
}

export default propVisitor
