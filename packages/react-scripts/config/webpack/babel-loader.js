'use strict';

const babelLoader = require('babel-loader');

const macroCheck = new RegExp('[./]macro');

module.exports = babelLoader.custom(babel => {
  const presetItem = babel.createConfigItem(require('babel-preset-react-app'), {
    type: 'preset',
  });

  return {
    config(cfg, { source }) {
      let options = Object.assign({}, cfg.options);

      if (!cfg.hasFilesystemConfig()) {
        // Add our default preset if the no "babelrc" found.
        options.presets = [...options.presets, presetItem];
      }

      if (macroCheck.test(source)) {
        options = Object.assign({}, options, {
          caller: Object.assign({}, options.caller, {
            craInvalidationToken: crypto.randomBytes(32).toString('hex'),
          }),
        });
      }

      return options;
    },
  };
});
