import * as NodeRED from "node-red";

interface ExampleNodeConfig extends NodeRED.NodeDef{}

export = function(RED:NodeRED.NodeAPI){

    function ExampleNode(this:NodeRED.Node, config:ExampleNodeConfig){
      RED.nodes.createNode(this,config);
      this.on('input',(msg:any,send,done)=>{
          msg.payload = "Hello from the Example Node";
          send(msg);
          if(done) done();
      });
    }

    RED.nodes.registerType('example',ExampleNode);
      
}