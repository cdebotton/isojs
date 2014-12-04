var React   = require('react');
var Router  = require('react-router');
var Routes  = require('./components/Routes.jsx');

if ('undefined' !== typeof window) {
  document.addEventListener('DOMContentLoaded', function() {
    Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
      React.render(
        <Handler
          params={state.params}
          query={state.query} />,
        document
      );
    });
  });
}
