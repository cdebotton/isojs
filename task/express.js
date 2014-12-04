function StartServer(env) {
  var gExpress  = require('gulp-express');

  env || (env = 'development');

  gExpress.run({
    file: './app/server.js',
    env: env
  });
}

module.exports.development  = StartServer.bind(StartServer, 'development');
module.exports.production   = StartServer.bind(StartServer, 'production');
