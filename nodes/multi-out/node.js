"use strict";
module.exports = function (RED) {
    function MultiOutNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', (msg, send, done) => {
            let outputs = [];
            for (let i = 0; i < config.outputs; i++) {
                outputs.push({ payload: `message ${i + 1}` });
            }
            send(...outputs);
            if (done)
                done();
        });
    }
    RED.nodes.registerType('multi-out', MultiOutNode);
};
