# Getting Started with Node-INQ 📦

This project is generated using the [node-inq](https://github.com/Doth-J/nodered-node-incubator) command line tool.

# Scripts Available 📜

In the project directory, you have access to the following scripts:

### `npm run dev` ⚡

Starts the development server in [localhost:1880](http://localhost:1880). The server runs using the `nodemon` global config file found in [nodemon.json](./nodemon.json). This can be reconfigured to include/exclude any extra files or resources needed to watch/ignore accordingly in order to restart the server, you can find more info [here](https://github.com/remy/nodemon#config-files). 

### `npm run build` 🔨 - Typescript 📘

Compile and transform TypeScript code into JavaScript. If development server is running in [localhost:1880](http://localhost:1880), it will compile code into the `nodes` directory causing a server restart, refresh the browser page and the developed node will be updated.

### `npm run dev:build` ⛓️ - Typescript 📘

Watches the `src` directory and builds the source code into the `nodes` directory every time a change is made to any `.ts` file of `src`. Run the **`dev`** script in one terminal and in another start the **`dev:build`** script to streamline the Typescript node(s) development.

# Import Incubated Nodes 🐣

Inside the project directory execute the `"node-inq nodes"` command, pick  **`.`** as the project directory and choose from the available incubated nodes available:

🐥 `example`: *Basic example template node*. 

- Upon receiving a msg, changes **msg.payload** property to *"Hello from the Example Node"*.

🐥 `multi-out`: *Multiple output node with adjustable out ports*.

- Upon receiving a msg, the node changes the **msg.payload** property to *"message **X**"*
- **X** is the number of the output port used to send the message.

🐥 `topic`: *Topic node utilizing node properties*. 
    
- Upon receiving a msg, the node changes the **msg.payload** property to *"Hello from Topic Node"* and the **msg.topic** property to the configured **topic** node property
- The **topic** property can be configured from the editor dialog panel.


### Have fun developing your nodes! ⭐