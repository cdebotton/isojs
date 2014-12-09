/** @flow */

var {PENDING, BAD_REQUEST, TIMEOUT, ERROR} = require('../constants/AppConstants').ApiStates;

exports.isUnresolved = function unresolved(state) {
  return [PENDING, BAD_REQUEST, TIMEOUT, ERROR].indexOf(state) > -1;
};
