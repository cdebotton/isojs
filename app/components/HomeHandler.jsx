/** @flow */

var React           = require('react');
var Cache           = require('../utils/Cache');
var {RouteHandler}  = require('react-router');
var StoreMixin      = require('../mixins/StoreMixin');
var TumblrStore     = require('../stores/TumblrStore');
var TumblrPhoto     = require('./TumblrPhoto.jsx');
var TumblrText      = require('./TumblrText.jsx');
var TumblrAnswer    = require('./TumblrAnswer.jsx');
var TumblrAudio     = require('./TumblrAudio.jsx');
var TumblrChat      = require('./TumblrChat.jsx');
var TumblrLink      = require('./TumblrLink.jsx');
var TumblrQuote     = require('./TumblrQuote.jsx');
var TumblrVideo     = require('./TumblrVideo.jsx');
var TumblrAPI       = require('../utils/TumblrAPI');

var CACHE_KEY = 'home:tumblr';

function getState(): Object {
  return { tumblr: TumblrStore.getState() };
}

var HomeHandler = React.createClass({
  mixins: [StoreMixin(getState)],

  statics: {
    willTransitionTo(transition: Object, params: Object) {
      if (! Cache.has(CACHE_KEY)) {
        transition.wait(
          TumblrAPI.text().then(function() {
            Cache.set(CACHE_KEY, TumblrStore.getState());
          })
        );
      }
    }
  },

  renderPostData(post: any, key: number): any {
    var template = (function() {
      switch(post.type) {
        case 'photo': return <TumblrPhoto post={post} />
        case 'text': return <TumblrText post={post} />
        case 'answer': return <TumblrAnswer post={post} />
        case 'audio': return <TumblrAudio post={post} />
        case 'chat': return <TumblrChat post={post} />
        case 'link': return <TumblrLink post={post} />
        case 'quote': return <TumblrQuote post={post} />
        case 'video': return <TumblrVideo post={post} />
      }
    })();

    return (
      <li key={key}>
        {template}
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
