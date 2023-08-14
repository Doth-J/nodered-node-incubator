# Node-RED Project Incubator :egg:
<div style="display: flex; align-items: center;height:20px; line-height:20px;">
   This is a CLI tool for generating Node-RED node projects. <img height="20px" src="https://nodered.org/about/resources/media/node-red-hexagon.png">
</div>

## Install :zap:
To install the CLI tool, execute the following command:
```console
npm install -g nodered-node-incubator
```

## Usage :rocket:
Once installed, you can use the tool with by executing the `node-inq` command:
```console
node-inq --help
Usage: node-inq [options] [command]

Nodes Project Incubator for Node-RED 🍼📦

Options:
-V, --version       output the version number
-h, --help          display help for command

Commands:
  generate [options]  Node-RED project generation tool
  nodes               Node-RED incubated nodes tool
  help [command]      display help for command
```

## Generating Projects :package:
To generate a new Node-RED project execute the following commmand:
```console
node-inq generate --help
Usage: node-inq generate [options]

Generate Node-RED node project template 🥚

Options:
  -i,--interactive           Enable interactive mode (default: false)
  -p, --project <directory>  Project directory
  -l, --license <type>       Project license (default: "MIT")
  -ts, --typescript          Generate typescript project (default: false)
  -e, --example              Import example node (default: false)
  -h, --help                 display help for command
```

### Interactive :baby_chick:
It is highly recommened to use `interactive mode` to help you in the project generation process. Following is an example running the command:
```console
node-inq generate --interactive
√ Enter project directory: ... node-red-contrib-example-project
√ Enter project author: ... Doth-J
√ Enter project description: ... Node-RED node generation example
√ Enter project license: ... ISC
√ Generate Typescript project: ... yes
√ Import template node: ... yes

🥚 Generating Node-RED project:
  - Directory: /home/doth/node-red-contrib-example-project ✔️
  - Language set to "Typescript" ✔️
  - Created nodes directory! ✔️
  - Created "package.json"! ✔️
  - Imported example node! 🐣

📕 Node-RED Incubator setup:
  - Installed required modules! ✔️
  - Created incubator server ✔️

📘 Typescript setup:
  - Installed required ts modules! ✔️
  - Created "tsconfig.json"! ✔️

✅ All done, project generated!
🖖 Let the Flow be with you
```
### Command Line :scroll:
To use the command line tool, you only need to define the `project` option with the directory of the project as shown below:
```console
node-inq generate --project ./example-project

🥚 Generating Node-RED node project:
  - Directory: /home/doth/example-project ✔️
  - Language set to "Javascript" ✔️
  - Created nodes directory! ✔️
  - Created "package.json"! ✔️

📕 Node-RED Incubator setup:
  - Installed required modules! ✔️
  - Created incubator server ✔️

✅ All done, project generated!
🖖 Let the Flow be with you
```

## Importing Incubated Nodes :hatching_chick:
To import incubated nodes, execute the following command:
```console
node-inq nodes
√ Enter project directory: ... example-project
√ Available nodes list: » Multi-out, Template, Topic

🐣 Importing incubated Node-RED node(s):
  - Imported multi-out node! 🐥
  - Imported example node! 🐥
  - Imported topic node! 🐥
``` 

## Incubator Server :baby_bottle:
The tool creates an `incubator` folder containing a minimal Node-RED setup to get you started.
Execute the following command to spin up your incubator server and fast track the development of your nodes:
```console
npm run dev
```
Change the `setting.js` file accordingly to your project needs.

### Have fun developing your nodes! :star: