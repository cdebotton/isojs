/** @flow */

function errorPropagation() {
  return function *(next) {
    try {
      yield next;
      var status = this.status || 404;
      if (status === 404) this.throw(404);
    }
    catch(err) {
      err.status = err.status || 500;
      err.message = err.expose ? err.message : 'Internal server error.';

      this.status = err.status;
      this.body = {code: err.status, message: err.message};
      this.app.emit('error', err, this);
    }
  }
}

module.exports = errorPropagation;