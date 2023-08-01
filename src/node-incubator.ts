#! /usr/bin/env node
import { program } from "commander";
import {generateProject} from "./commands/generate";
import {importNodes} from "./commands/import";
import fs from "fs";
import path from "path";

program.name('node-inq')
    .description(`Nodes Project Incubator for Node-RED 🍼📦`)
    .version(JSON.parse(fs.readFileSync(path.join(__dirname,'..','package.json')).toString()).version);

program.command('generate')
    .summary('Node-RED project generation tool')
    .description(`Generate Node-RED node project template 🥚`)
    .option('-i,--interactive','Enable interactive mode',false)
    .option('-p, --project <directory>','Project directory')
    .option('-l, --license <type>','Project license','MIT')
    .option('-e, --example','Import example node',false)
    .option('-ts, --typescript','Generate typescript project',false)
    .action((_,command)=>generateProject(command.opts()))
    .showHelpAfterError()
    .showSuggestionAfterError()

program.command('nodes')
    .summary('Node-RED incubated nodes tool')
    .description('Import incubated Node-RED nodes into project 🐣')
    .action(importNodes)
    .showHelpAfterError()
    .showSuggestionAfterError()
    

program.parse();