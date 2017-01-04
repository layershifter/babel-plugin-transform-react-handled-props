import React, { PropTypes } from 'react';

export const First = () => React.createElement('div', null);
First.handledProps = ['children'];
First.propTypes = {
  children: PropTypes.node
};

export const Second = () => null;
