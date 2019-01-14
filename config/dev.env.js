const prodEnv = require('./prod.env');
const merge = require('webpack-merge');

module.exports = merge(prodEnv, {//dev环境
  NODE_ENV: '"development"',
  EVN_CONFIG:'"dev"',
});
