var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';

const someProps = {
  active: PropTypes.boolean
};

function Example() {
  return React.createElement('div', null);
}

Example.handledProps = ['children', 'className'];
Example.propTypes = _extends({}, someProps, {
  children: PropTypes.node,
  className: PropTypes.string
});

export default Example;
