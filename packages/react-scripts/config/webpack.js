'use strict';

const chalk = require('chalk');

const getWebpackConfig = ({ dev, appConfig }) => {
  let config;
  if (dev) {
    config = require('./webpack.config.dev');
  } else {
    config = require('./webpack.config.prod');
  }

  if (typeof appConfig.webpack === 'function') {
    console.log(chalk.yellow(`> Using external webpack configuration`));
    config = appConfig.webpack(config, { dev });
  }

  return config;
};

module.exports = getWebpackConfig;
