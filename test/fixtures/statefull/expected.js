import React, { Component, PropTypes } from 'react';

export default class Example extends Component {
  render() {
    return null;
  }
}

Example.handledProps = ['children', 'className'];

Example.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
};
