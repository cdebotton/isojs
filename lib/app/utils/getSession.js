/** @flow */

var Promise             = require('bluebird');
var request             = require('superagent');

module.exports = function getSession() {
  return new Promise(function(resolve, reject) {
    request.get('http://localhost:3000/api/v1/request-token')
      .end(function(err, res) {
        if (res.status == 200) {
          resolve(res.body.key);
        }
        else {
          resolve(false);
        }
      });
  });
}
