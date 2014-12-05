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
var json            = require('koa-json');
var mongoose        = require('mongoose');
var serveStatic     = require('koa-static');
var responseTime    = require('./middleware/responseTime');
var Api             = require('./api/routes/Api');
var app             = koa();

var env = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

app.keys = ['secret'];

app.use(responseTime('Response-time'));
app.use(json());
app.use(compress());
app.use(bodyParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(mount('/api/v1', Api.middleware()));

if (env === 'development') {
  var koaLr = require('koa-livereload');
  var clearCache = require('./middleware/clearCache');
  app.use(koaLr());
  app.use(clearCache());
}

require('node-jsx').install({
  harmony: true,
  stripTypes: true
});

var renderComponent = require('./middleware/renderComponent.jsx');

app.use(renderComponent());

mongoose.connect('mongodb://localhost/debotton', function() {
  console.log('Connected to `mongodb://localhost/debotton`.');

  var port = process.env.PORT || 3000;
  app.listen(port, function(err) {
    if (err) throw err;
    console.log('Listening in `' + process.env.NODE_ENV + '` mode on port `' + port + '`.');
  });
});
