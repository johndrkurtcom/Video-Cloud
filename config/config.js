var config = {
  production: {
    session: {
      key: 'the.express.session.id',
      secret: 'somethings.secret'
    },
    database: 'mongodb://videocloud:videocloud@apollo.modulusmongo.net:27017/sOqis8yb',
    facebook: {
      appid: '1611479335776079',
      appsecret: '84624dbd29babb9aaf75144f446fb0c5',
      callback: 'http://videocloud.mod.bz/auth/facebook/callback'
    },
    twitter: {
      consumerKey: '5vzU2rbD7Io0ip16uhU7oGcZO',
      consumerSecret: 'JBM8Nra6LshzjWyezdxrgl4umaraMZUZBRfIwrtnz30TCJYA5x',
      callbackURL: 'http://videocloud.mod.bz/auth/twitter/callback'
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
