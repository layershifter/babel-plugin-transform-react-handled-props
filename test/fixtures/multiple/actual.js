import React, { PropTypes } from 'react';

export function First() {
  return <div />;
}

export function Second() {
  return <div />;
}

First.propTypes = {
  children: PropTypes.node
};

Second.propTypes = {
  children: PropTypes.node
};
