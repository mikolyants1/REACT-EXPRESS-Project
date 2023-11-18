import { EventEmitter } from 'events';
class Emitter extends EventEmitter {
    constructor(evt) {
        super();
        this.evt = evt;
    }
    test(data) {
        this.on(this.evt, () => {
            if (data) {
                console.log(`success:`, data);
            }
            else {
                console.error(`${this.evt} error`);
            }
        });
        this.emit(this.evt);
    }
}
export default Emitter;
