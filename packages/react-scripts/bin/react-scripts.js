#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');

const spawn = require('react-dev-utils/crossSpawn');
const clearConsole = require('react-dev-utils/clearConsole');
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

let proc;

const startProcess = script => {
  proc = spawn(
    'node',
    nodeArgs
      .concat(require.resolve('../scripts/' + script))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: 'inherit' }
  );

  proc.on('close', (code, signal) => {
    if (signal) {
      if (signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }
      process.exit(1);
    }
    process.exit(code);
  });

  proc.on('error', err => {
    console.error(err);
    process.exit(1);
  });

  return proc;
};

switch (script) {
  case 'build':
  case 'eject':
  case 'analyze':
  case 'start':
  case 'test': {
    proc = startProcess(script);
    break;
  }
  default:
    console.log(chalk.yellow('Unknown script "' + script + '".'));
    break;
}

const kill = () => {
  if (proc) {
    proc.kill();
  }
};

process.on('SIGINT', kill);
process.on('SIGTERM', kill);
process.on('exit', kill);

if (script === 'start') {
  const { watchFile } = require('fs');
  const { appConfig } = require('../config/paths');

  watchFile(appConfig, (cur, prev) => {
    if (cur.size > 0 || prev.size > 0) {
      clearConsole();
      console.log(
        chalk.yellow(
          `> Found a change in app.config.js, restarting the server...\n`
        )
      );
      // Don't listen to 'close' now since otherwise parent gets killed by listener
      proc.removeAllListeners('close');
      proc.kill();
      proc = startProcess('start');
    }
  });
}
