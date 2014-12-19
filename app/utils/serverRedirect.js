/** @flow */

var {Navigation} = require('react-router');
var Transition = require('react-router/modules/utils/Transition');

module.exports = function(app) {
  Transition.prototype.redirect = function(to, params, query) {
    // var url = Navigation.makePath(to, params, query);
    app.redirect(to);
  }
};
