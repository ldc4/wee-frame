#!/usr/bin/env node

const start = require('../scripts/start').default;
const build = require('../scripts/build').default;
const commander = require('commander');
const program = new commander.Command();


program
  .command('start [type]')
  .description('启动（ 应用 - app | 平台 - platform ）')
  .action(start);

program
  .command('build [type]')
  .description('构建（ 应用 - app | 平台 - platform ）')
  .action(build);

program
  .command('*')
  .action(function(env){
    console.log('暂不支持该命令 "%s"', env);
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}

