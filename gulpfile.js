"use strict";

var gulp = require('gulp');

gulp.task('del', require('./task/del'));

gulp.task('jest', require('./task/jest').run);
gulp.task('jest:watch', require('./task/jest').watch);

gulp.task('flow', require('./task/flow').run);
gulp.task('flow:watch', require('./task/flow').watch);

gulp.task('assets', require('./task/assets').run);
gulp.task('assets:watch', require('./task/assets').watch);
gulp.task('assets:build', require('./task/assets').build);

gulp.task('stylus', require('./task/stylus').run);
gulp.task('stylus:watch', require('./task/stylus').watch);
gulp.task('stylus:build', require('./task/stylus').build);

gulp.task('browserify', require('./task/browserify').run);
gulp.task('browserify:watch', require('./task/browserify').watch);
gulp.task('browserify:build', require('./task/browserify').build);

gulp.task('koa:dev', require('./task/koa').development);
gulp.task('koa:prd', require('./task/koa').production);

gulp.task('migrate:drop', require('./task/migrate').drop);
gulp.task('migrate:seed', require('./task/migrate').seed);
gulp.task('migrate:reset', require('./task/migrate').reset);

gulp.task('test', ['flow', 'jest']);
gulp.task('build', ['assets:build', 'browserify:build', 'stylus:build']);
gulp.task('serve', ['build', 'koa:prd']);
gulp.task('watch', ['assets:watch', 'koa:dev', 'browserify:watch', 'stylus:watch']);
gulp.task('default', ['flow', 'assets', 'browserify', 'stylus', 'jest']);
