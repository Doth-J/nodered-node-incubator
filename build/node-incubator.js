#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generate_1 = require("./commands/generate");
const import_1 = require("./commands/import");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
commander_1.program.name('node-inq')
    .description(`Nodes Project Incubator for Node-RED 🍼📦`)
    .version(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'package.json')).toString()).version);
commander_1.program.command('generate')
    .summary('Node-RED project generation tool')
    .description(`Generate Node-RED node project template 🥚`)
    .option('-i,--interactive', 'Enable interactive mode', false)
    .option('-p, --project <directory>', 'Project directory')
    .option('-l, --license <type>', 'Project license', 'MIT')
    .option('-e, --example', 'Import example node', false)
    .option('-ts, --typescript', 'Generate typescript project', false)
    .action((_, command) => (0, generate_1.generateProject)(command.opts()))
    .showHelpAfterError()
    .showSuggestionAfterError();
commander_1.program.command('nodes')
    .summary('Node-RED incubated nodes tool')
    .description('Import incubated Node-RED nodes into project 🐣')
    .action(import_1.importNodes)
    .showHelpAfterError()
    .showSuggestionAfterError();
commander_1.program.parse();
