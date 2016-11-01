import React, { Component, PropTypes } from 'react';

export default class Statefull extends Component {
  render() {
    const { children, className } = this.props;

    return <div className={className}>{children}</div>
  }
}

Statefull._meta = {
  name: 'Component',
  type: META.TYPES.ELEMENT,
}

Statefull.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,
}