import PropTypes from 'prop-types';
import React from 'react';
export default function Foo() {
  return function Bar(Component) {
    return class Baz extends React.Component {
      static propTypes = {
        children: PropTypes.node
      };

      render() {
        return <Component />;
      }

      static handledProps = ["children"];
    };
  };
}
Foo.handledProps = [];
