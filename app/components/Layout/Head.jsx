/** @flow */

var React = require('react');
var config = require('../../config');
var StoreMixin = require('../../mixins/StoreMixin');
var PageStore = require('../../stores/PageStore');

var Head = React.createClass({
  mixins: [StoreMixin(getState, PageStore)],

  getStylesheets(env: string): any {
    var min = env === 'production' ? '.min' : '';

    return (
      <link
        href={'/stylesheets/app' + min + '.css'}
        rel="stylesheet" />
      );
  },

  render(): any {
    var {env} = this.props;
    var stylesheets = this.getStylesheets(env);

    return (
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{getTitle(this.state.page)}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic|Josefin+Slab:400,600' rel='stylesheet' />
        {stylesheets}
      </head>
    );
  }
});

function getTitle(page) {
  return page.get('title') === config.title ?
    config.title :
    `${page.get('title')} | ${config.title}`;
}

function getState(params: Object, query: Object): Object {
  return {page: PageStore.getState()};
}

module.exports = Head;
