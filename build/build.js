require('./check-versions')();

// process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const rm = require('rimraf');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

// const spinner = ora('building for production...');
var spinner = ora('building for '+ process.env.NODE_ENV +' of '+process.env.env_config+' mode...... ')
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), (err) => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;

    const stdout = stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    });
    process.stdout.write(`${stdout}\n\n`);

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }
    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"));
  });
});
