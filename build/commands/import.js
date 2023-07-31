"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importNodes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
function importNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        let config;
        let nodes = fs_1.default.readdirSync(path_1.default.join(__dirname, '..', '..', 'nodes')).map(node => {
            return {
                title: node.charAt(0).toUpperCase() + node.slice(1),
                value: node
            };
        });
        const questions = [
            {
                type: 'text',
                initial: '.',
                name: 'project',
                message: 'Enter project directory:',
                validate: value => !fs_1.default.existsSync(path_1.default.join(process.cwd(), value)) ? `Project directory "${value}" does not exist!` : true
            },
            {
                type: 'confirm',
                initial: false,
                name: 'typescript',
                message: 'Import Typescript:'
            },
            {
                type: 'multiselect',
                name: 'nodes',
                message: 'Available incubated nodes:',
                choices: [
                    ...nodes
                ],
                instructions: false,
                hint: '- Space to select. Return to submit'
            }
        ];
        config = yield (0, prompts_1.default)(questions);
        const dir = path_1.default.join(process.cwd(), config.project);
        console.group('\n🐣 Importing incubated Node-RED node(s):');
        config.nodes.forEach((node) => {
            if (config.typescript)
                fs_1.default.writeFileSync(path_1.default.join(dir, 'src', `${node}.ts`), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", node, "node.ts")));
            fs_1.default.writeFileSync(path_1.default.join(dir, 'nodes', `${node}.js`), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", node, "node.js")));
            fs_1.default.writeFileSync(path_1.default.join(dir, 'nodes', `${node}.html`), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", node, "node.html")));
            const module = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dir, 'package.json')).toString());
            module["node-red"].nodes[node] = `nodes/${node}.js`;
            fs_1.default.writeFileSync(path_1.default.join(dir, 'package.json'), JSON.stringify(module, null, 3));
            console.log(`- Imported ${node} node! 🐥`);
        });
        console.log();
        console.groupEnd();
    });
}
exports.importNodes = importNodes;
