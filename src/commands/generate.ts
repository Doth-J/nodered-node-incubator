import fs from "fs";
import path from "path";
import prompts, { PromptObject } from "prompts";
import { OptionValues } from "commander";
import { execSync } from "child_process";

export async function generateProject(options:OptionValues){
    let config;
    if(options.interactive){
        const questions:PromptObject[] = [
            {
                type:'text',
                initial:'node-red-contrib-example-project',
                name:'name',
                message:'Enter project directory:',
                validate: value => fs.existsSync(path.join(process.cwd(),value)) ? `❌ Project directory "${value}" already exists!`: true
            },
            {
                type:'text',
                name:'author',
                message:'Enter project author:'
            },
            {
                type:'text',
                name:'description',
                message:'Enter project description:'
            },
            {
                type:'text',
                initial:'ISC',
                name:'license',
                message:'Enter project license:'
            },
            {
                type:'confirm',
                initial: false,
                name:'typescript',
                message:'Generate Typescript project:'
            },
            {
                type:'confirm',
                initial: false,
                name:'template',
                message:'Import template node:'
            }
        ]
        config = await prompts(questions)
    }else{
        if(fs.existsSync(path.join(process.cwd(),options.project))) throw new Error(`❌ Project directory "${options.project}" already exists!`)
        config = {
            name:options.project,
            author:"",
            description:"Node-INQ generated Node-RED node project",
            license:"ISC",
            typescript:options.typescript,
            template:options.template
        }
    }
    const dir = path.join(process.cwd(),config.name)
    console.group('\n🥚 Generating Node-RED node project:')
    fs.mkdirSync(dir);
    console.log(`- Directory: ${dir} ✔️`)
    console.log(`- Language set to ${config.typescript?'"Typescript"':'"Javascript"'} ✔️`)
    fs.mkdirSync(path.join(dir,"nodes"));
    fs.mkdirSync(path.join(dir,"nodes","icons"));
    console.log(`- Created nodes directory! ✔️`)
    const module ={
        name: config.name,
        author:config.author,
        description:config.description,
        license:config.license,
        version:"0.0.1",
        keywords:["node-red","node-inq"],
        "node-red":{nodes:{}},
        scripts: {dev:"nodemon"}
    };
    if(config.typescript){
        Object.assign(module.scripts,{build:"tsc"});
        fs.mkdirSync(path.join(dir,"src"));
    }
    if(config.template){
        config.typescript ? fs.writeFileSync(path.join(dir,'src','template.ts'),fs.readFileSync(path.join(__dirname,"..","..","nodes","template","node.ts"))) 
        : fs.writeFileSync(path.join(dir,'nodes','template.js'),fs.readFileSync(path.join(__dirname,"..","..","nodes","template","node.js")));
        fs.writeFileSync(path.join(dir,'nodes','template.html'),fs.readFileSync(path.join(__dirname,"..","..","nodes","template","node.html")));
        Object.assign(module["node-red"].nodes,{template:"nodes/template.js"});
    }
    fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify(module,null,3));
    console.log(`- Created package.json! ✔️`);
    if(config.template) console.log(`- Imported template node! 🐣`);
    const ignore = ".nodered\nnode_modules\nincubator\npackage-lock.json\nnodemon.json";
    fs.writeFileSync(path.join(dir,'.gitignore'),ignore);
    fs.writeFileSync(path.join(dir,'.npmignore'),ignore);
    console.log(`- Created .npmignore & .gitignore ✔️`)
    console.groupEnd();
    fs.mkdirSync(path.join(dir,"incubator"));
    console.log();
    console.group('📕 Node-RED Incubator setup:');
    execSync(`npm --prefix ${dir} install express node-red`);
    console.log(`- Installed required modules! ✔️`);
    fs.writeFileSync(path.join(dir,'incubator','server.js'),fs.readFileSync(path.join(__dirname,'..','..','incubator','server.js')));
    fs.writeFileSync(path.join(dir,'incubator','settings.js'),fs.readFileSync(path.join(__dirname,'..','..','incubator','settings.js')));
    console.log(`- Created incubator server ✔️`)
    console.groupEnd();
    if(config.typescript){
        const tsconfig = {
            exclude:["incubator"],
            compilerOptions:{
                strict:true,
                target:"es2016",
                module:"commonjs",
                rootDir:"src",
                outDir:"nodes",
                resolveJsonModule:true,
                allowSyntheticDefaultImports:true,
                esModuleInterop:true,
                forceConsistentCasingInFileNames:true,
                skipLibCheck:true,
            }
        }
        console.log();
        console.group('📘 Typescript setup:');
        execSync(`npm --prefix ${dir} install -D typescript @types/node @types/node-red`);
        console.log(`- Installed required ts modules! ✔️`)
        fs.writeFileSync(path.join(dir,'tsconfig.json'),JSON.stringify(tsconfig,null,3));
        console.log(`- Created "tsconfig.json"! ✔️`)
        console.groupEnd();
    }
    execSync(`npm --prefix ${dir} install -D nodemon`);
    fs.writeFileSync(path.join(dir,'nodemon.json'),fs.readFileSync(path.join(__dirname,'..','..','incubator','nodemon.json')));
    console.log('\n✅ All done, project generated!\n🖖 Let the Flow be with you.');
}