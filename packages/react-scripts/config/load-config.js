'use strict';

const fs = require('fs-extra');

const { appConfig } = require('./paths');

const defaultConfig = {
  webpack: null,
  devServer: null,
};

const loadConfig = () => {
  if (fs.existsSync(appConfig)) {
    const userConfig = require(appConfig);
    return Object.assign(defaultConfig, userConfig);
  }

  return defaultConfig;
};

module.exports = loadConfig;
