/** @flow */

var {Navigation} = require('react-router');
var Transition = require('react-router/modules/utils/Transition');
var Path = require('react-router/modules/utils/Path');

module.exports = function(app) {
  Transition.prototype.redirect = function(to, params, query) {
    app.redirect(to);
  }
};
