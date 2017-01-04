import React, { PropTypes } from 'react';

function Example() {
  return React.createElement('div', null);
}
Example.handledProps = ['active', 'children', 'className'];
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
