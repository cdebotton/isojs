/** @flow */

var React = require('react');

var TumblrPhoto = React.createClass({
  propTypes: {
    post: React.PropTypes.shape({
      photos: React.PropTypes.array.isRequired,
      caption: React.PropTypes.string
    }).isRequired
  },

  renderImage(image: Object, key: number): any {
    return (
      <img
        key={`photo:${key}`}
        src={image.original_size.url}
        width={image.original_size.width}
        height={image.original_size.height} />
    );
  },

  render(): any {
    return (
      <div className="photos">
        {this.props.post.photos.map(this.renderImage)}
      </div>
    );
  }
});

module.exports = TumblrPhoto;
