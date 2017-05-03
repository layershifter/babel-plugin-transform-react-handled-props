import React, { PropTypes } from 'react';

export default function Foo() {
  return function Bar(Component) {
    var _class, _temp;

    return _temp = _class = class Baz extends React.Component {
      render() {
        return React.createElement(Component, null);
      }
    }, _class.handledProps = [], _temp;
  };
}
Foo.handledProps = [];