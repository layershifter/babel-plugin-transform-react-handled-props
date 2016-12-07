import React, { Component, PropTypes } from 'react';

export default class Example extends Component {

  render() {
    return null;
  }
}
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node
};
Example.handledProps = ['active', 'children', 'className'];
