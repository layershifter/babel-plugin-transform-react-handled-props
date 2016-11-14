import React, { Component, PropTypes } from 'react';

export default class Example extends Component {
  render() {
    return null;
  }
}

Example.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
};
