var gulp          = require('gulp');
var gUtil         = require('gulp-util');

var PATHS = {
  BUILD             : './public/',
  FONTAWESOME_SRC   : './node_modules/font-awesome/fonts/*',
  FONTS_DEST        : './public/fonts/',
  IMAGE_SRC         : './app/assets/img/**/*',
  IMAGE_DEST        : './public/img',
  SRC               : './app/assets/**/*',
};

function not(path) {
  return '!' + path;
}

function AssetPipeline(watch, build) {
  var kLr      = require('./lib/koa-server');

  watch || (watch = false);
  build || (build = false);

  this.prototype.gImagemin(build);
  this.prototype.gCopy(build);
  this.prototype.fonts(build);

  if (watch) {
    gulp.watch([PATHS.IMAGE_SRC], this.prototype.gImagemin.bind(this, build));
    gulp.watch([PATHS.SRC, not(PATHS.IMAGE_SRC), not(PATHS.HTML_SRC)], this.prototype.gCopy.bind(this, build));
    gulp.watch([PATHS.BUILD], kLr.notify);
  }
}

AssetPipeline.prototype.gImagemin = function(build) {
  var gImagemin     = require('gulp-imagemin');
  var pngcrush      = require('imagemin-pngcrush');

  build || (build = false);

  gUtil.log(gUtil.colors.green('Running:', gUtil.colors.magenta('gImagemin')));

  return gulp.src(PATHS.IMAGE_SRC)
    .pipe(gImagemin({
      progressive: true,
      svgoPlugins: [{removeViewbox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(PATHS.IMAGE_DEST));
}

AssetPipeline.prototype.gCopy = function(build) {
  build || (build = false);

  gUtil.log(gUtil.colors.green('Running:', gUtil.colors.magenta('gCopy')));

  return gulp.src([not(PATHS.IMAGE_SRC), not(PATHS.HTML_SRC), PATHS.SRC])
      .pipe(gulp.dest(PATHS.BUILD));
}

AssetPipeline.prototype.fonts = function(build) {
  build || (build = false);

  gUtil.log(gUtil.colors.green('Running:', gUtil.colors.magenta('fonts')));

  return gulp.src(PATHS.FONTAWESOME_SRC)
    .pipe(gulp.dest(PATHS.FONTS_DEST));
}

module.exports = {
  run   : AssetPipeline.bind(AssetPipeline, false, false),
  watch : AssetPipeline.bind(AssetPipeline, true, false),
  build : AssetPipeline.bind(AssetPipeline, false, true)
};
