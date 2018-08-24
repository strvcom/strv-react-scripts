'use strict';

const babelLoader = require('babel-loader');

module.exports = babelLoader.custom(babel => {
  const presetItem = babel.createConfigItem(require('babel-preset-react-app'), {
    type: 'preset',
  });
  const namedAssetImportItem = babel.createConfigItem(
    [
      require('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent: 'svgr/webpack![path]',
          },
        },
      },
    ],
    { type: 'plugin' }
  );

  return {
    config(cfg) {
      const options = Object.assign({}, cfg.options);

      if (!cfg.hasFilesystemConfig()) {
        // Add our default preset if the no "babelrc" found.
        options.presets = [...options.presets, presetItem];
      }

      options.plugins = [...options.plugins, namedAssetImportItem];

      return options;
    },
  };
});
