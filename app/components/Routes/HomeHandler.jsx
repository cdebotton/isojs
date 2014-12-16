/** @flow */

var React                 = require('react');
var PageActionCreators    = require('../../actions/PageActionCreators');
var PageStore             = require('../../stores/PageStore');
var StoreMixin            = require('../../mixins/StoreMixin');
var AsyncDataMixin        = require('../../mixins/AsyncDataMixin');
var config                = require('../../config');

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState, PageStore), AsyncDataMixin(fetchData)],

  render(): any {
    return (
      <div className="home-handler">
        <h2>Isomorphic koa&ndash;js server</h2>
      </div>
    );
  }
});

function getState(params: Object, query: Object): Object {
  return {};
}

function fetchData(params: Object, query: Object): any {
  return new Promise(function(resolve, reject) {
    var handleChange = function() {
      PageStore.removeChangeListener(handleChange);
      resolve(PageStore.getState().get('title'));
    };
    PageStore.addChangeListener(handleChange);
    PageActionCreators.setTitle(config.title);
  });
}

module.exports = HomeHandler;
