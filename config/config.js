var config = {
  production: {
    database: '',
    facebook: {
      appid: '',
      appsecret: '',
      callback: ''
    }
  },
  default: {
    database: 'mongodb://localhost:27017/shortly',
    facebook: {
      appid: '1611479335776079',
      appsecret: '84624dbd29babb9aaf75144f446fb0c5',
      callback: '/auth/facebook/callback'
    }
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}