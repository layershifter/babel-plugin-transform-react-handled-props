import PropTypes from 'prop-types';
import React from 'react';

function Example() {
  return <div />;
}

Example.handledProps = ['aria-label', 'children'];
Example.propTypes = {
  'aria-label': PropTypes.string,
  children: PropTypes.node
};

export default Example;
