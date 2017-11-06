import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const HOC = Child => class extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <Child />;
  }
  static handledProps = ['children'];
};
HOC.handledProps = [];
