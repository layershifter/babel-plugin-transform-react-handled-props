import PropTypes from 'prop-types';
import React from 'react';

const Example = React.forwardRef(function Example() {
  return <div />;
});
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
