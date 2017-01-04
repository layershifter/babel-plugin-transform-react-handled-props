const getExpressionIdentifier = ({ node: { left: { object = {} } } }) => object.name

export default getExpressionIdentifier
