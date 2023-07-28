import fs from "fs";
import path from "path";
import prompts, { PromptObject, Choice } from "prompts";

export async function importNodes(){
    let config:any;
    let nodes:Choice[] = fs.readdirSync(path.join(__dirname,'..','..','nodes')).map(node=>{
        return {
            title:node.charAt(0).toUpperCase()+node.slice(1),
            value: node
        }
    })
    const questions:PromptObject[] = [
        {
            type:'text',
            initial:'.',
            name:'project',
            message:'Enter project directory:',
            validate: value => !fs.existsSync(path.join(process.cwd(),value)) ? `Project directory "${value}" does not exist!`: true
        },
        {
            type:'confirm',
            initial: false,
            name:'typescript',
            message:'Import Typescript:'
        },
        {
            type:'multiselect',
            name:'nodes',
            message:'Available incubated nodes:',
            choices:[
                ...nodes
            ],
            instructions:false,
            hint: '- Space to select. Return to submit'
        }
    ]
    config = await prompts(questions);
    const dir = path.join(process.cwd(),config.project)
    console.group('\n🐣 Importing incubated Node-RED node(s):')
    config.nodes.forEach((node:string)=>{
        if(config.typescript) fs.writeFileSync(path.join(dir,'src',`${node}.ts`),fs.readFileSync(path.join(__dirname,"..","..","nodes",node,"node.ts")));
        fs.writeFileSync(path.join(dir,'nodes',`${node}.js`),fs.readFileSync(path.join(__dirname,"..","..","nodes",node,"node.js")));
        fs.writeFileSync(path.join(dir,'nodes',`${node}.html`),fs.readFileSync(path.join(__dirname,"..","..","nodes",node,"node.html")));
        const module = JSON.parse(fs.readFileSync(path.join(dir,'package.json')).toString());
        module["node-red"].nodes[node] = `nodes/${node}.js`;
        fs.writeFileSync(path.join(dir,'package.json'),JSON.stringify(module,null,3));
        console.log(`- Imported ${node} node! 🐥`);
    });
    console.log();
    console.groupEnd();
}