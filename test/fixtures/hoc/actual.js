import React, { PropTypes } from 'react';

export default function Foo() {
  return function Bar(Component) {
    return class Baz extends React.Component {
      static propTypes = {
        children: PropTypes.node
      }

      render() {
        return <Component />;
      }
    }
  }
}
