/** @flow */

var React       = require('react/addons');
var {classSet}  = React.addons;
var co          = require('co');

var TumblrPosts           = require('../TumblrPosts/TumblrPosts.jsx');
var StoreMixin            = require('../../mixins/StoreMixin');
var AsyncDataMixin        = require('../../mixins/AsyncDataMixin');
var PageStore             = require('../../stores/PageStore');
var TumblrStore           = require('../../stores/TumblrStore');
var PageActionCreators    = require('../../actions/PageActionCreators');
var TumblrAPI             = require('../../utils/TumblrAPI');
var {ApiStates}           = require('../../constants/AppConstants');
var {RouteHandler, Link}  = require('react-router');

var PostsHandler = React.createClass({
  mixins: [
    StoreMixin(getState, TumblrStore),
    AsyncDataMixin(fetchData)
  ],

  statics: {
    getPageTitle(): string {
      return 'posts from tumblr';
    }
  },

  render(): any {
    var tumblr = this.state.tumblr.toJS();
    var cx = classSet({
      'posts-handler': true
    });

    return (
      <div className={cx}>
        <header className="header">
          <div className="info">
            <h2>{tumblr.blog.title}</h2>
            <p>{tumblr.blog.description}</p>
            <dl>
              <dt>Posts</dt>
              <dd>{tumblr.blog.posts}</dd>
              <dt>Likes</dt>
              <dd>{tumblr.blog.likes}</dd>
            </dl>
          </div>
          <nav>
            <Link to="posts"><i className="fa fa-asterisk" /></Link>
            <Link to="post" params={{postType: 'photo'}}><i className="fa fa-camera" /></Link>
            <Link to="post" params={{postType: 'audio'}}><i className="fa fa-headphones" /></Link>
            <Link to="post" params={{postType: 'video'}}><i className="fa fa-video-camera" /></Link>
            <Link to="post" params={{postType: 'quote'}}><i className="fa fa-quote-left" /></Link>
            <Link to="post" params={{postType: 'link'}}><i className="fa fa-link" /></Link>
            <Link to="post" params={{postType: 'chat'}}><i className="fa fa-wechat" /></Link>
            <Link to="post" params={{postType: 'answer'}}><i className="fa fa-question" /></Link>
          </nav>
        </header>
        <div className="posts">
          {getLoader(tumblr.status)}
          <TumblrPosts posts={this.state.tumblr.get('posts')} />
        </div>
      </div>
    );
  }
});

function getLoader(status) {
  return (status === ApiStates.PENDING) ? (
    <span>Loading...</span>
  ) : false;
}

function getState(params, query): Object {
  var {postType} = params;
  var tumblr = postType ? TumblrStore.getPostType(postType) : TumblrStore.getState();

  return { tumblr: tumblr };
}

function fetchData(params, query): Object {
  return co(function *() {
    yield TumblrAPI[params.postType || 'posts']();
  });
}

module.exports = PostsHandler;
