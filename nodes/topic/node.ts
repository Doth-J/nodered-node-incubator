import * as NodeRED from "node-red";

interface TopicNodeConfig extends NodeRED.NodeDef{
    topic:string
}

export = function(RED:NodeRED.NodeAPI){

    function TopicNode(this:NodeRED.Node, config:TopicNodeConfig){
      RED.nodes.createNode(this,config);
      this.on('input',(msg:any,send,done)=>{
          msg.topic = config.topic;
          msg.payload = "Hello from Topic Node";
          send(msg);
          if(done) done();
      });
    }

    RED.nodes.registerType('topic',TopicNode);
      
}