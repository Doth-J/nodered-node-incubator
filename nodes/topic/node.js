"use strict";
module.exports = function (RED) {
    function TopicNode(config) {
        RED.nodes.createNode(this, config);
        this.on('input', (msg, send, done) => {
            msg.topic = config.topic;
            msg.payload = "Hello from Topic Node";
            send(msg);
            if (done)
                done();
        });
    }
    RED.nodes.registerType('topic', TopicNode);
};
