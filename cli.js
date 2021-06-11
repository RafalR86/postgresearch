/**
 * code belongs to package @squareboat/nest-console
 */

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const console_1 = require('@squareboat/nest-console');
const yargs = require('yargs');
const fs = require('fs');

function checkFileExistsSync(filepath){
  let flag = true;
  try{fs.accessSync(filepath, fs.constants.F_OK);}catch(e){flag = false;}
  return flag;
}

const app_1 = require('./dist/src/app.module'); // CHANGE THE IMPORT IF NEEDED

async function bootstrap() {
  const app = await core_1.NestFactory.createApplicationContext(
    app_1.AppModule,
    { logger: false },
  );
  const argv = yargs.argv;
  const c = argv._[0];
  argv.command = c;
  if (typeof argv.command != 'string') {
    console_1.Logger.error(' PLEASE ADD A COMMAND ');
    return process.exit();
  }
  const command = console_1.CommandMeta.getCommand(argv.command);
  if (!command || !command.target) {
    console_1.Logger.error(` ${argv.command} : command not found `);
    return process.exit();
  }
  await console_1.CommandRunner.handle(command, argv);
  return process.exit();
}
bootstrap();
//# sourceMappingURL=cli.js.map
