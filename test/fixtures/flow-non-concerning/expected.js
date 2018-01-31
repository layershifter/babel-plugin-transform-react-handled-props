// @flow
import React, { Component } from 'react';

type Props = {
  name?: string;
};

type OtherProps = {
  value?: string;
};

class Foo extends Component<Props> {
  render() {
    return <div {...this.props} />;
  }
  static handledProps = ['name'];
}

export default Foo;
