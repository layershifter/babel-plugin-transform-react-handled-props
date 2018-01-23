// @flow

import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  name?: string;
  qq?: string;
  children?: React.Node;
};

class Baz extends React.Component<Props> {

  render() {
    return <div {...this.props} />;
  }
  static handledProps = ['children', 'name', 'qq'];
}

export default Baz;