import React, { Component, PropTypes } from 'react';

export default class Example extends Component {
  render() {
    return null;
  }
}

Example.handledProps = ['className', 'children'];

Example.propTypes = {
  children: PropTypes.node,
};
