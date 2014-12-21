"use strict";

var gulp    = require('gulp');
var del     = require('del');


module.exports = function(cb) {
  del([
    './public'
  ], cb);
};
