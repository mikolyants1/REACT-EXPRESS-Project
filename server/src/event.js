import { EventEmitter } from 'events';
class Emitter extends EventEmitter {
    constructor(evt) {
        super();
        this.evt = evt;
    }
    test(data) {
        this.on(this.evt, () => {
            console.error(`${this.evt} error : ${data}`);
        });
        this.emit(this.evt);
    }
}
export default Emitter;
