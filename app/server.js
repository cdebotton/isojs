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
var responseTime    = require('./utils/responseTime');
var renderComponent = require('./utils/renderComponent');
var Api             = require('./api/routes/Api');
var app             = koa();

app.keys = ['secret'];

app.use(responseTime('Response-time'));
app.use(compress());
app.use(bodyParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(mount('/api', Api.middleware()));
app.use(renderComponent());

mongoose.connect('mongodb://localhost/debotton', function() {
  console.log('Connected to `mongodb://localhost/debotton`.');
  app.listen(3000, function(err) {
    if (err) throw err;
    console.log('Listening on port `3000`.');
  });
});
