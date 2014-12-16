/** @flow */

var PageActionCreators = require('../actions/PageActionCreators');

var PageTitleMixin = function(title: string): any {
  return {
    componentDidMount(): void {
      PageActionCreators.setTitle(title);
    },

    componentWillMount(): void {
      PageActionCreators.setTitle(title);
    }
  };
};

module.exports = PageTitleMixin;
