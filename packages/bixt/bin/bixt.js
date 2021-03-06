#!/usr/bin/env node
const CMD_HELP = require('../cmd/help');
const DEFAULT_COMMAND = 'dev';
const logError = require('../logger')('bixt:bin', 'error');

(async () => {
  try {
    const argv = require('minimist')(process.argv.slice(2), {
      string: [
        'workDir',
      ],
      boolean: [
        'help',
      ],
      alias: {
        d: 'workDir',
        'work-dir': 'workDir',
        h: 'help',
      },
    });
    const [command, args, opts] = parseCommand(argv);
    await command(args, opts);
  } catch (err) {
    logError(err);
    process.exit(1);
  }
})();

function parseCommand (argv) {
  if (argv.help) {
    return [CMD_HELP];
  }

  const [cmd, ...args] = argv._;

  const workDir = process.cwd();

  const opts = {
    port: process.env.PORT || 3000,
    workDir,
    ...argv,
  };

  delete opts._;

  return [require(`../cmd/${cmd || DEFAULT_COMMAND}`), args, opts];
}
