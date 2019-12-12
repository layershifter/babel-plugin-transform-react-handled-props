import PropTypes from 'prop-types';
import React from 'react';
export default class extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  render() {
    return null;
  }

  static handledProps = ["children", "className"];
}
