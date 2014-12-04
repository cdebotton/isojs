var gulp    = require('gulp');
var gShell  = require('gulp-shell');
var gUtil   = require('gulp-util');

function TestRunner(watch) {
  watch || (watch = false);

  var run = function() {
    gulp.src('.')
      .pipe(gShell([
        'npm test'
      ]))
      .on('error', function(e) {
        gUtil.log(e.toString());
      });
  };

  if (watch) {
    gulp.watch([
      './app/**/*.js',
      './app/**/*.coffee',
      './**/*.jsx'
    ], run);
  }

  return run();
}

module.exports.run    = TestRunner.bind(TestRunner, false);
module.exports.watch  = TestRunner.bind(TestRunner, true);
