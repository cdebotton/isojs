module.exports = {
  title: 'koajs isomorphic server',
  db: 'mongodb://localhost/debotton',
  secretKey: 'koajs-test',
  secretToken: 'koajs-test-token',
  sessionName: 'koajs-test:session',

  tumblr: {
    consumerKey: process.env.TUMBLR_CONSUMERKEY,
    consumerSecret: process.env.TUMBLR_CONSUMERSECRET,
    callbackURL: 'http://localhost:3000/auth/tumblr/callback'
  },

  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },

  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },

  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },

  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },

  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  }
};
