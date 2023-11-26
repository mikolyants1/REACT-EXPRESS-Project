import { EventEmitter } from 'events'

 class Emitter extends EventEmitter {
  public evt:string
    constructor(evt:string){
      super();
      this.evt = evt
    }
    test(data?:string):void{
     this.on(this.evt,()=>{
      console.error(`${this.evt} error : ${data}`)
      }) 
     this.emit(this.evt)
    }
}
export default Emitter