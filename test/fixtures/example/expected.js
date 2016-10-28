function Component(props) {
  const {children, className} = props

  return <div className={className}> {children} </div>
}

Component._meta = {
  name: 'Component',
  type: META.TYPES.ELEMENT,
  props: ['children', 'className']
}

Component.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
}

export default Component