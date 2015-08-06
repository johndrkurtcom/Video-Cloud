var config = {
  production: {
    database: ''
  },
  default: {
    database: 'mongodb://localhost:27017/shortly'
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}