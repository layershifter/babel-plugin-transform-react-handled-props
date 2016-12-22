import React, { PropTypes } from 'react';

const Example = () => {
  return null;
};
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
