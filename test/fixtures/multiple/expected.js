import PropTypes from 'prop-types';
import React from 'react';
export function First() {
  return <div />;
}
First.handledProps = ["children"];
export function Second() {
  return <div />;
}
Second.handledProps = ["children"];
First.propTypes = {
  children: PropTypes.node
};
Second.propTypes = {
  children: PropTypes.node
};