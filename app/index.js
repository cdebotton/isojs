var Router = require('react-router');
var Routes = require('./components/Routes.jsx');

if ('undefined' !== typeof window) {
  document.addEventListener('DOMContentLoaded', function() {
    Router.run(Routes, Router.LocationHistory, function(Handler, state) {
      React.render(
        <Handler
          params={state.params}
          query={state.query}
          env={process.env.NODE_ENV} />,
        document
      );
    });
  });
}
