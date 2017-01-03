import * as t from 'babel-types'

const isReactImport = ({ node: { source } }) => t.isStringLiteral(source, { value: 'react' })

export default isReactImport
