"use strict";
module.exports = function (RED) {
    function TemplateNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', (msg, send, done) => {
            msg.payload = "Hello from Template Node";
            send(msg);
            if (done)
                done();
        });
    }
    RED.nodes.registerType('template', TemplateNode);
};
