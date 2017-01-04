import React, { PropTypes } from 'react';

function Example() {
  return React.createElement('div', null);
}
Example.handledProps = ['children', 'className'];

Example.propTypes = {
  children: PropTypes.node
};

export default Example;
