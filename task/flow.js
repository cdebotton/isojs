var gulp    = require('gulp');
var gShell  = require('gulp-shell');
var gUtil   = require('gulp-util');

function TypeChecker(watch) {
  watch || (watch = false);

  if (watch) {
    gUtil.log(gUtil.colors.green('Starting flow server...'));
    gulp.src('.')
      .pipe(gShell([
        'flow start'
      ]));
  }

  var run = function() {
    gulp.src('.')
      .pipe(gShell([
        watch ? 'flow' : 'flow check'
      ]))
      .on('error', function(e) {
        gUtil.log(e.toString());
      });
  };

  if (watch) {
    gulp.watch([
      './app/**/*.js',
      './**/*.jsx'
    ], run);
  }

  return run;
}

module.exports.run    = TypeChecker.bind(TypeChecker, false);
module.exports.watch  = TypeChecker.bind(TypeChecker, true);
