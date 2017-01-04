import React, { PropTypes } from 'react';

export function First() {
  return React.createElement('div', null);
}

First.handledProps = ['children'];
export function Second() {
  return React.createElement('div', null);
}

Second.handledProps = ['children'];
First.propTypes = {
  children: PropTypes.node
};

Second.propTypes = {
  children: PropTypes.node
};