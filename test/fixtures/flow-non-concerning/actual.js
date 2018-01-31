// @flow
import React, { Component } from 'react';

type Props = {
  name?: string;
}

type OtherProps = {
  value?: string;
}

class Foo extends Component<Props> {
  render() {
    return <div {...this.props} />;
  }
}

export default Foo;
