import { EventEmitter } from 'events'

 class Emitter extends EventEmitter {
  private evt:string;
    constructor(evt:string){
      super();
      this.evt = evt;
    }
    test(data?:string):void{
     this.on(this.evt,():void=>{
      console.error(`${this.evt} error : ${data}`);
      });
     this.emit(this.evt);
    };
};
export const emitPass:Emitter = new Emitter("passCheck");

export const emitUser:Emitter = new Emitter("userCheck");

export const emitMess:Emitter = new Emitter("messCheck");