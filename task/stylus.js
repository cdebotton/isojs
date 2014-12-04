var gulp        = require('gulp');
var gStylus     = require('gulp-stylus');
var gPlumber    = require('gulp-plumber');
var gIf         = require('gulp-if');
var gUtil       = require('gulp-util');
var gConcat     = require('gulp-concat');
var gRename     = require('gulp-rename');
var gMinifyCss  = require('gulp-minify-css');
var gSourcemaps = require('gulp-sourcemaps');
var gExpress    = require('gulp-express');
var nib         = require('nib');
var streamqueue = require('streamqueue');

function StylusCompiler(watch, build) {
  var PATHS = {
    NORMALIZE   : './node_modules/normalize.css/normalize.css',
    FONTAWESOME : './node_modules/font-awesome/css/font-awesome.css',
    SRC         : './app/styles/index.styl',
    STYLUS      : './app/**/*.styl',
    DEST        : './dist/stylesheets/',
    DEST_SRC    : './dist/stylesheets/**/*.css',
    TARGET      : 'app.css'
  };

  watch || (watch = false);
  build || (build = false);

  function compileStylus() {
    gUtil.log(gUtil.colors.green('Building styles with Stylus'));
    var stream = streamqueue({objectMode: true});
    stream.pipe(gIf(!build, gSourcemaps.init({loadMaps: true})));
    stream.queue(gulp.src(PATHS.NORMALIZE));
    stream.queue(gulp.src(PATHS.FONTAWESOME));
    stream.queue(
      gulp.src(PATHS.SRC)
        .pipe(gStylus({
          use: [nib()],
          debug: !build,
          sourcemap: {
            inline: true,
            sourceRoot: '.'
          }
        }))
        .pipe(gPlumber())
    );

    return stream.done()
      .pipe(gConcat('app.css'))
      .pipe(gIf(build, gRename({suffix: '.min'})))
      .pipe(gIf(build, gMinifyCss()))
      .pipe(gIf(!build, gSourcemaps.write()))
      .pipe(gulp.dest(PATHS.DEST));
  }

  if (watch) {
    gulp.watch(PATHS.STYLUS, compileStylus);
    gulp.watch(PATHS.DEST_SRC, gExpress.notify);
  }

  return compileStylus();
}

module.exports.run    = StylusCompiler.bind(StylusCompiler, false, false);
module.exports.watch  = StylusCompiler.bind(StylusCompiler, true, false);
module.exports.build  = StylusCompiler.bind(StylusCompiler, false, true);
