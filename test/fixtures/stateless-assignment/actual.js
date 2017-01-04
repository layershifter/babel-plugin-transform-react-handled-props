import React, { PropTypes } from 'react';

const Example = function () {
  return <div />;
};
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
