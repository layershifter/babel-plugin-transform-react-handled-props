// @flow

import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  name?: string;
  _text?: string;
  children?: React.Node;
};

class Baz extends React.Component<Props> {

  render() {
    return <div {...this.props} />;
  }
  static handledProps = ['_text', 'aria-describedby', 'children', 'name'];
}

export default Baz;