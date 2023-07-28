import * as NodeRED from "node-red";

interface TemplateNodeConfig extends NodeRED.NodeDef{}

export = function(RED:NodeRED.NodeAPI){

    function TemplateNode(this:NodeRED.Node, config:TemplateNodeConfig){
      RED.nodes.createNode(this,config);
      this.on('input',(msg:any,send,done)=>{
          msg.payload = "Hello from Template Node";
          send(msg);
          if(done) done();
      });
    }

    RED.nodes.registerType('template',TemplateNode);
      
}