import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Example extends Component {
  render() {
    return null;
  }
  static handledProps = ['children', 'className'];
}
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
