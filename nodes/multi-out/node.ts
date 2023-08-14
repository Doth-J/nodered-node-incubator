import * as NodeRED from "node-red";

interface MultiOutNodeConfig extends NodeRED.NodeDef{
    outputs:number
}

export = function(RED:NodeRED.NodeAPI){

    function MultiOutNode(this:NodeRED.Node, config:MultiOutNodeConfig){
      RED.nodes.createNode(this,config);
      this.on('input',(msg:any,send,done)=>{
          let outputs = [];  
          for(let i=0; i<config.outputs; i++){
            outputs.push({payload:`message ${i+1}`});
          }
          send(outputs);
          if(done) done();
      });
    }

    RED.nodes.registerType('multi-out',MultiOutNode);
      
}