import PropTypes from 'prop-types';
import React from 'react';

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
