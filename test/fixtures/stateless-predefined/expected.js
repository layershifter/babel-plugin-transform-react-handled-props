import PropTypes from 'prop-types';
import React from 'react';

function Example() {
  return <div />;
}
Example.handledProps = ['children', 'className'];

Example.propTypes = {
  children: PropTypes.node
};

export default Example;
