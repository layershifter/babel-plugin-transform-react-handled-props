import React, { PropTypes } from 'react';

function Example() {
  return null;
}

Example.handledProps = ['children', 'className'];

Example.propTypes = {
  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string
};

export default Example;
