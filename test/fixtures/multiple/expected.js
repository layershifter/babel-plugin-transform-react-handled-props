import React, { PropTypes } from 'react';

export function First() {
  return null;
}

First.handledProps = ['children'];
export function Second() {
  return null;
}

Second.handledProps = ['children'];
First.propTypes = {
  children: PropTypes.node
};

Second.propTypes = {
  children: PropTypes.node
};