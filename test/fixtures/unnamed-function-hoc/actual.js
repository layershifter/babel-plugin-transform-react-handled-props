import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function() {
  return function(Component) {
    class Wrapper extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }

    return hoistStatics(Wrapper, Component);
  }
}