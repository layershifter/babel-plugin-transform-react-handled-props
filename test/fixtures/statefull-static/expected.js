import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Example extends Component {

  static defaultProps = {
    active: true
  };

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return null;
  }
  static handledProps = ['active', 'children', 'className'];
}
