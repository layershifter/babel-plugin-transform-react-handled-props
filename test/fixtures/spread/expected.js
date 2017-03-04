import React, { PropTypes } from 'react';

const someProps = {
  active: PropTypes.boolean
};

function Example() {
  return React.createElement('div', null);
}

Example.handledProps = ['children', 'className'];
Example.propTypes = {
  ...someProps,
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
