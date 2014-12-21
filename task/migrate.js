'use strict';

var mongoose  = require('mongoose');
var async     = require('async');
var gUtil     = require('gulp-util');
var fs = require('fs');
var modelPaths = __dirname + '/../api/models';
var seedPaths = __dirname + '/../api/migrations';

function readdir(callback) {
  fs.readdir(modelPaths, callback);
};

function loadModels(files, callback) {
  var modelNames = files.filter(function(file) {
    if (/\.js$/.test(file)) {
      require(modelPaths + '/' + file);
      return true;
    }
  }).map(function(file) {
    return /(.+)\.js$/.exec(file)[1];
  });

  callback(null, modelNames);
};

function connect(modelNames, callback) {
  mongoose.connect('mongodb://localhost/debotton');
  mongoose.connection.on('open', callback.bind(callback, null, modelNames));
};

function drop(modelNames, callback) {
  async.map(modelNames, function(model, callback) {
    mongoose.model(model).collection.remove(callback);
  }, function() {
    callback(null, modelNames);
  });
};

function readSeeds(modelNames, callback) {
  fs.readdir(seedPaths, callback.bind(callback, null, modelNames));
}

function runMigrations(modelNames, err, seeds, callback) {
  async.map(seeds, function(seed, callback) {
    var migration = require(seedPaths + '/' + seed);
    if (modelNames.indexOf(migration.model) === -1) {
      callback(new Error('Model ' + migration.model + ' not found for migration ' + seed));
    }

    var model = mongoose.model(migration.model);
    async.map(migration.seed, function(seed) {
      model.create(seed, callback);
    }, callback);
  }, callback);
}

function dropCollections() {
  gUtil.log(gUtil.colors.green('Dropping collections.'));
  async.waterfall([readdir, loadModels, connect, drop], function(err, results) {
    if (err) throw err;
    mongoose.connection.close();
  });
}

function seedCollections() {
  gUtil.log(gUtil.colors.green('Seeding collections.'));
  async.waterfall([readdir, loadModels, connect, readSeeds, runMigrations], function(err, results) {
    if (err) throw err;
    mongoose.connection.close();
  });
}

function resetCollections() {
  gUtil.log(gUtil.colors.green('Resetting collections.'));
  async.waterfall([readdir, loadModels, connect, drop, readSeeds, runMigrations], function(err, results) {
    if (err) throw err;
    mongoose.connection.close();
  });
}

module.exports = {
  drop: dropCollections,
  seed: seedCollections,
  reset: resetCollections
};
