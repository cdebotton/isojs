function responseTime(headerName) {
  return function *(next) {
    var start = new Date();
    yield next;
    var end = new Date();
    var time = end - start;

    this.set(headerName, time + 'ms');
  };
}

module.exports = responseTime;
