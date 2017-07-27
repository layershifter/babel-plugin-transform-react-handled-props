import React, { Component, PropTypes } from 'react';

export const HOC = Child => class extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <Child />
  }
}
