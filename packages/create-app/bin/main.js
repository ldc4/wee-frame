#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();

const { run } = require('../scripts/index');

run();
