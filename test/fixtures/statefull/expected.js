import React, { Component, PropTypes } from 'react';

export default class Statefull extends Component {
  render() {
    const { children, className } = this.props;

    return React.createElement(
      'div',
      { className: className },
      children
    );
  }
}

Statefull._meta = {
  name: 'Component',
  type: META.TYPES.ELEMENT,
  props: ['children', 'className']
};

Statefull.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
};