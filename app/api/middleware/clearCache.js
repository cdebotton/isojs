var env = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

module.exports = function(opts) {
  return function *(next) {
    if (env === 'development') {
      for (var i in require.cache) {
        if (/\.jsx$/.test(i)) {
          delete require.cache[i];
        }
      }
    }
    yield next;
  };
};
