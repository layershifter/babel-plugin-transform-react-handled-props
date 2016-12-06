import React, { Component, PropTypes } from 'react';

export default class Example extends Component {
  static handledProps = ['className']

  render() {
    return null;
  }
}

Example.propTypes = {
  children: PropTypes.node
};
