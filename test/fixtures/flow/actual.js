// @flow
import React, { Component } from 'react';

type Props = {
  name?: string;
  _text?: string;
  'aria-describedby'?: string;
  children?: React.Node;
};

class Foo extends Component<Props> {
  render() {
    return <div {...this.props} />;
  }
}

export default Foo;
