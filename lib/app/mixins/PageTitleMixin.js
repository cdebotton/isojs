/** @flow */

var PageActionCreators = require('../actions/PageActionCreators');
var invariant = require('react/lib/invariant');
var {toString} = Object.prototype;

var PageTitleMixin: Function =  {
  statics: {
    setPageTitle(): void {
      PageActionCreators.setTitle(this.getPageTitle());
    }
  }
};


module.exports = PageTitleMixin;
