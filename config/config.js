var config = {
  production: {
    session: {
      key: '',
      secret: ''
    },
    database: '',
    facebook: {
      appid: '',
      appsecret: '',
      callback: ''
    },
    twitter: {
      consumerKey: '',
      consumerSecret: '',
      callbackURL: ''
    }
  },
  default: {
    session: {
      key: 'the.express.session.id',
      secret: 'somethings.secret'
    },
    database: 'mongodb://localhost:27017/videocloud',
    facebook: {
      appid: '1611479335776079',
      appsecret: '84624dbd29babb9aaf75144f446fb0c5',
      callback: 'http://127.0.0.1:3000/auth/facebook/callback'
    },
    twitter: {
      consumerKey: 'pNpA7HszfTgSX8P1OZ846MRiQ',
      consumerSecret: 'HSD6S4NCzGKEajQ1Xw6Ww88BbN5GQHTT1UYY53wAXhyThLl0Jz',
      callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
    }
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}
