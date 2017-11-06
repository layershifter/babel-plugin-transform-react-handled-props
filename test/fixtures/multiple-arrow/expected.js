import PropTypes from 'prop-types';
import React from 'react';

export const First = () => <div />;
First.handledProps = ['children'];
First.propTypes = {
  children: PropTypes.node
};

export const Second = () => null;
