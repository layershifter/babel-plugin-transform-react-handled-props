import React, { PropTypes } from 'react';

function Example() {
  return <div />;
}
Example.handledProps = ['className'];
Example.propTypes = {
  children: PropTypes.node
};

export default Example;
