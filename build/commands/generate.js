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
exports.generateProject = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const child_process_1 = require("child_process");
function generateProject(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let config;
        if (options.interactive) {
            const questions = [
                {
                    type: 'text',
                    initial: 'node-red-contrib-example-project',
                    name: 'name',
                    message: 'Enter project directory:',
                    validate: value => fs_1.default.existsSync(path_1.default.join(process.cwd(), value)) ? `❌ Project directory "${value}" already exists!` : true
                },
                {
                    type: 'text',
                    name: 'author',
                    message: 'Enter project author:'
                },
                {
                    type: 'text',
                    name: 'description',
                    message: 'Enter project description:'
                },
                {
                    type: 'text',
                    initial: 'ISC',
                    name: 'license',
                    message: 'Enter project license:'
                },
                {
                    type: 'confirm',
                    initial: false,
                    name: 'typescript',
                    message: 'Generate Typescript project:'
                },
                {
                    type: 'confirm',
                    initial: false,
                    name: 'template',
                    message: 'Import template node:'
                }
            ];
            config = yield (0, prompts_1.default)(questions);
        }
        else {
            if (fs_1.default.existsSync(path_1.default.join(process.cwd(), options.project)))
                throw new Error(`❌ Project directory "${options.project}" already exists!`);
            config = {
                name: options.project,
                author: "",
                description: "Node-INQ generated Node-RED node project",
                license: "ISC",
                typescript: options.typescript,
                template: options.template
            };
        }
        const dir = path_1.default.join(process.cwd(), config.name);
        console.group('\n🥚 Generating Node-RED node project:');
        fs_1.default.mkdirSync(dir);
        console.log(`- Directory: ${dir} ✔️`);
        console.log(`- Language set to ${config.typescript ? '"Typescript"' : '"Javascript"'} ✔️`);
        fs_1.default.mkdirSync(path_1.default.join(dir, "nodes"));
        fs_1.default.mkdirSync(path_1.default.join(dir, "nodes", "icons"));
        console.log(`- Created nodes directory! ✔️`);
        const module = {
            name: config.name,
            author: config.author,
            description: config.description,
            license: config.license,
            version: "0.0.1",
            keywords: ["node-red", "node-inq"],
            "node-red": { nodes: {} },
            scripts: { dev: "nodemon" }
        };
        if (config.typescript) {
            Object.assign(module.scripts, { build: "tsc" });
            fs_1.default.mkdirSync(path_1.default.join(dir, "src"));
        }
        if (config.template) {
            config.typescript ? fs_1.default.writeFileSync(path_1.default.join(dir, 'src', 'template.ts'), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", "template", "node.ts")))
                : fs_1.default.writeFileSync(path_1.default.join(dir, 'nodes', 'template.js'), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", "template", "node.js")));
            fs_1.default.writeFileSync(path_1.default.join(dir, 'nodes', 'template.html'), fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "nodes", "template", "node.html")));
            Object.assign(module["node-red"].nodes, { template: "nodes/template.js" });
        }
        fs_1.default.writeFileSync(path_1.default.join(dir, 'package.json'), JSON.stringify(module, null, 3));
        console.log(`- Created package.json! ✔️`);
        if (config.template)
            console.log(`- Imported template node! 🐣`);
        const ignore = ".nodered\nnode_modules\nincubator\npackage-lock.json\nnodemon.json";
        fs_1.default.writeFileSync(path_1.default.join(dir, '.gitignore'), ignore);
        fs_1.default.writeFileSync(path_1.default.join(dir, '.npmignore'), ignore);
        console.log(`- Created .npmignore & .gitignore ✔️`);
        console.groupEnd();
        fs_1.default.mkdirSync(path_1.default.join(dir, "incubator"));
        console.log();
        console.group('📕 Node-RED Incubator setup:');
        (0, child_process_1.execSync)(`npm --prefix ${dir} install express node-red`);
        console.log(`- Installed required modules! ✔️`);
        fs_1.default.writeFileSync(path_1.default.join(dir, 'incubator', 'server.js'), fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'incubator', 'server.js')));
        fs_1.default.writeFileSync(path_1.default.join(dir, 'incubator', 'settings.js'), fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'incubator', 'settings.js')));
        console.log(`- Created incubator server ✔️`);
        console.groupEnd();
        if (config.typescript) {
            const tsconfig = {
                exclude: ["incubator"],
                compilerOptions: {
                    strict: true,
                    target: "es2016",
                    module: "commonjs",
                    rootDir: "src",
                    outDir: "nodes",
                    resolveJsonModule: true,
                    allowSyntheticDefaultImports: true,
                    esModuleInterop: true,
                    forceConsistentCasingInFileNames: true,
                    skipLibCheck: true,
                }
            };
            console.log();
            console.group('📘 Typescript setup:');
            (0, child_process_1.execSync)(`npm --prefix ${dir} install -D typescript @types/node @types/node-red`);
            console.log(`- Installed required ts modules! ✔️`);
            fs_1.default.writeFileSync(path_1.default.join(dir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 3));
            console.log(`- Created "tsconfig.json"! ✔️`);
            console.groupEnd();
        }
        (0, child_process_1.execSync)(`npm --prefix ${dir} install -D nodemon`);
        fs_1.default.writeFileSync(path_1.default.join(dir, 'nodemon.json'), fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'incubator', 'nodemon.json')));
        console.log('\n✅ All done, project generated!\n🖖 Let the Flow be with you.');
    });
}
exports.generateProject = generateProject;