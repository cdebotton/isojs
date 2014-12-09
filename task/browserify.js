"use strict";

var gulp        = require('gulp');
var gIf         = require('gulp-if');
var gUglify     = require('gulp-uglify');
var koaServer   = require('./lib/koa-server');
var gUtil       = require('gulp-util');
var gRename     = require('gulp-rename');
var gStreamify  = require('gulp-streamify');
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var envify      = require('envify/custom');
var source      = require('vinyl-source-stream');

function Bundler(watch, build) {
  watch || (watch = false);
  build || (build = false);

  watchify.args.entry     = true;
  watchify.args.fullPaths = watch ? true : false;
  watchify.args.debug     = !build ? true : false;

  var bundler = browserify('./app/index.js', watchify.args);
  bundler.transform('reactify', {es6: true, stripTypes: true});
  bundler.transform(envify({NODE_ENV: build ? 'production' : 'development'}));

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
    gulp.watch(['./dist/**/*.js'], koaServer.notify);
  }

  function rebundle() {
    gUtil.log(gUtil.colors.green('Building JavaScripts with Browserify'));

    bundler
      .bundle()
      .on('error', gUtil.log.bind(gUtil, 'Browserify error'))
      .pipe(source('bundle.js'))
      .pipe(gIf(build, gStreamify(gUglify())))
      .pipe(gIf(build, gRename({suffix: '.min'})))
      .pipe(gulp.dest('./dist'));
  }

  return rebundle();
};

module.exports.run    = Bundler.bind(Bundler, false, false);
module.exports.watch  = Bundler.bind(Bundler, true, false);
module.exports.build  = Bundler.bind(Bundler, false, true);
