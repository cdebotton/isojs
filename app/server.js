var path            = require('path');
var fs              = require('fs');

var modelPath = path.join(__dirname, 'api', 'models');
var files = fs.readdirSync(modelPath);
files.forEach(function(file) {
  if (/[A-Z].+\.js$/.test(file)) {
    require(path.join(modelPath, file));
  }
});

var koa             = require('koa');
var bodyParser      = require('koa-bodyparser');
var session         = require('koa-session');
var compress        = require('koa-compress');
var mount           = require('koa-mount');
var passport        = require('koa-passport');
var mongoose        = require('mongoose');
var serveStatic     = require('koa-static');
var responseTime    = require('./utils/responseTime');
var Api             = require('./api/routes/Api');
var app             = koa();

app.keys = ['secret'];

if (process.env.NODE_ENV === 'development') {
  var koaLr = require('koa-livereload')();
  var lr  = require('tiny-lr')();
  app.use(koaLr);
}

app.use(responseTime('Response-time'));
app.use(compress());
app.use(bodyParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(mount('/api', Api.middleware()));

require('node-jsx').install({
  harmony: true,
  stripTypes: true
});

var renderComponent = require('./utils/renderComponent.jsx');

app.use(renderComponent());

mongoose.connect('mongodb://localhost/debotton', function() {
  console.log('Connected to `mongodb://localhost/debotton`.');
  app.listen(3000, function(err) {
    if (err) throw err;
    console.log('Listening on port `3000`.');
  });
});
