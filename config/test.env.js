const devEnv = require('./dev.env');
const merge = require('webpack-merge');

module.exports = merge(devEnv, {//uat环境
  NODE_ENV: '"testing"',
  EVN_CONFIG:'"test"',
});
