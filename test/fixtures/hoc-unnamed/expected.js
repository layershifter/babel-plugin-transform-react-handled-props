import React, { Component, PropTypes } from 'react';

export const HOC = Child => {
  var _class, _temp;

  return _temp = _class = class extends Component {

    render() {
      return React.createElement(Child, null);
    }
  }, _class.propTypes = {
    children: PropTypes.node
  }, _class.handledProps = ['children'], _temp;
};
HOC.handledProps = [];
