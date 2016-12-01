import React, { PropTypes } from 'react';

function Example() {
  return null;
}

Example.handledProps = ['className', 'children'];

Example.propTypes = {
  children: PropTypes.node,
};

export default Example;
