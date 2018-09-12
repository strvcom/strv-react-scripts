'use strict';

const babelLoader = require('babel-loader');

module.exports = babelLoader.custom(babel => {
  const presetItem = babel.createConfigItem(
    [require('babel-preset-react-app'), { flow: false }],
    {
      type: 'preset',
    }
  );
  const tsItem = babel.createConfigItem(require('@babel/preset-typescript'), {
    type: 'preset',
  });
  const flowItem = babel.createConfigItem(require('@babel/preset-flow'), {
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
    customOptions(loader) {
      const custom = {
        flow: loader.flow,
        typescript: loader.typescript,
      };

      delete loader.flow;
      delete loader.typescript;

      return { custom, loader };
    },
    config(cfg, { customOptions }) {
      const options = Object.assign({}, cfg.options);

      if (!cfg.hasFilesystemConfig()) {
        // Add our default preset if the no "babelrc" found.
        options.presets = [...options.presets, presetItem];
      }

      options.presets = [
        ...options.presets,
        customOptions.typescript && tsItem,
        customOptions.flow && flowItem,
      ].filter(Boolean);
      options.plugins = [...options.plugins, namedAssetImportItem];

      return options;
    },
  };
});
