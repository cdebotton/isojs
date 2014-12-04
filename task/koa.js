function StartServer(env) {
  var koaServer = require('./lib/koa-server');

  env || (env = 'development');

  koaServer.run({
    file: './app/server.js',
    env: env
  });
}

module.exports.development  = StartServer.bind(StartServer, 'development');
module.exports.production   = StartServer.bind(StartServer, 'production');
