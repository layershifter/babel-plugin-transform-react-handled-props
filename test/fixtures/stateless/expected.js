import React, { PropTypes } from 'react';

function Example() {
  return null;
}
Example.handledProps = ['children', 'className']
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
