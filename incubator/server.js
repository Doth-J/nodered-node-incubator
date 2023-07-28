const http = require("http");
const express = require("express");
const RED = require("node-red");
const settings = require('./settings');

const app = express();
const server = http.createServer(app);
RED.init(server,settings);
app.use(settings.httpAdminRoot,RED.httpAdmin);
app.use(settings.httpNodeRoot,RED.httpNode);
server.listen(settings.uiPort);
RED.start().then(()=>RED.log.info(`Started Node-RED server: http://localhost:${settings.uiPort}`));