var fs        = require('fs');
var path      = require('path');
var Router    = require('koa-router');
var config    = require('../../../app/config');
var passport  = require('../passport');
var Api       = new Router();

var files = fs.readdirSync(__dirname);
files.forEach(function(file) {
  if (/\.js$/.test(file) && file !== 'index.js') {
    try {
      require(path.join(__dirname, file))(Api, passport, config);
    }
    catch (err) {
      console.trace(err);
    }
  }
});

module.exports = Api;

