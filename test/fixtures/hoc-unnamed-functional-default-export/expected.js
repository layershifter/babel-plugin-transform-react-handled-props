import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
export default function __handledPropsAnonFn() {
  return function (WrappedComponent) {
    class Wrapper extends React.Component {
      static displayName = WrappedComponent.displayName || 'Component';

      render() {
        return <WrappedComponent {...this.props} additionalProp={'whatever'} />;
      }

      static handledProps = [];
    }

    return hoistStatics(Wrapper, WrappedComponent);
  };
}
__handledPropsAnonFn.handledProps = [];