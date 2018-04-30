import PropTypes from 'prop-types';
import React from 'react';

function Example() {
  return <div />;
}

Example.handledProps = ["children", "className"];
Example.defaultProps = {
  as: 'button'
};
Example.propTypes = {
  as: PropTypes.element,
  children: PropTypes.node,
  className: PropTypes.string
};
export default Example;
