'use strict';

const fs = require('fs-extra');

const { appConfig } = require('./paths');

const defaultConfig = {
  webpack: null,
};

const loadAppConfig = () => {
  if (fs.existsSync(appConfig)) {
    const userConfig = require(appConfig);
    return Object.assign(defaultConfig, userConfig);
  }

  return defaultConfig;
};

module.exports = loadAppConfig;
