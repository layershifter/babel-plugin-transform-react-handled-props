import React, { PropTypes } from 'react';

const Example = () => React.createElement('div', null);
Example.handledProps = ['active', 'children', 'className'];
Example.defaultProps = {
  active: true
};
Example.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Example;
