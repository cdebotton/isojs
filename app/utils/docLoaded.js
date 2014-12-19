/** @flow */

module.exports = function docLoaded() {
  return new Promise(function(resolve, reject) {
    var timer = setTimeout(reject, 10000);
    document.addEventListener('DOMContentLoaded', resolve);
    clearTimeout(timer);
  });
}
