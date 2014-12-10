/** @flow */

var React           = require('react');
var {RouteHandler}  = require('react-router');
var StoreMixin      = require('../mixins/StoreMixin');
var TumblrStore     = require('../stores/TumblrStore');
var TumblrAPI       = require('../utils/TumblrAPI');

function getState(): Object {
  return { tumblr: TumblrStore.getState() };
}

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      transition.wait(TumblrAPI.photos());
    }
  },

  renderPostData(post: any, key: number): any {
    return (
      <li key={key}>
        {post.photos.map((photo, i) => (
          <img
            key={i}
            src={photo.original_size.url}
            width={photo.original_size.width}
            height={photo.original_size.height} />
        ))}
        <div className="caption" dangerouslySetInnerHTML={{__html: post.caption}} />
      </li>
    );
  },

  render(): any {
    var tumblr = this.state.tumblr.toJS();

    return (
      <div className="home-handler">
        <header>
          <h2>{tumblr.blog.title}</h2>
          <p>{tumblr.blog.description}</p>
          <dl>
            <dt>Posts</dt>
            <dd>{tumblr.blog.posts}</dd>
            <dt>Likes</dt>
            <dd>{tumblr.blog.likes}</dd>
          </dl>
        </header>
        <ul>
          {tumblr.posts.map(this.renderPostData)}
        </ul>
      </div>
    );
  }
});

module.exports = HomeHandler;
