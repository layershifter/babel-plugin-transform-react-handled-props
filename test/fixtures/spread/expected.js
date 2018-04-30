import PropTypes from 'prop-types';
import React from 'react';
const someProps = {
  active: PropTypes.boolean
};

function Example() {
  return <div />;
}

Example.handledProps = ["children", "className"];
Example.propTypes = { ...someProps,
  children: PropTypes.node,
  className: PropTypes.string
};
export default Example;
