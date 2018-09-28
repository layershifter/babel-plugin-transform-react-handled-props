import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

export default function() {
  return function(WrappedComponent) {
    class Wrapper extends React.Component {
      static displayName = WrappedComponent.displayName || 'Component'

      render() {
        return <WrappedComponent {...this.props} additionalProp={'whatever'} />
      }
    }

    return hoistStatics(Wrapper, WrappedComponent)
  }
}
