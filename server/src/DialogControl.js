import { readFileSync, writeFileSync } from 'fs';
import { Base } from './server.js';
import Emitter from './event.js';
const emitter = new Emitter('dialogCheck');
class Dialog {
    getMess(req, res) {
        const data = readFileSync(Base, 'utf-8');
        const users = JSON.parse(data);
        const id = Number(req.params.id);
        const user = users.find((i) => i.id == id);
        if (!user) {
            emitter.test();
            return res.status(404);
        }
        else {
            emitter.test(data);
            return res.status(200).json(user);
        }
    }
    addMess(req, res) {
        if (!req.body)
            return res.status(404);
        const data = readFileSync(Base, 'utf-8');
        const { text, date, now, day, month } = req.body;
        const id1 = req.params.id;
        const id2 = req.body.id;
        const users = JSON.parse(data);
        const item = users.find((i) => i.phone == id2);
        const mess = users.find((i) => i.phone == id1);
        if (!item || !mess)
            return res.status(404);
        const dialog = mess.message
            .find((i) => i.id == item.id);
        dialog ? dialog.mess.push({
            text: text,
            date: date,
            now: now,
            day: day,
            month: month
        }) : mess.message.push({
            id: item.id,
            mess: [
                {
                    text: text,
                    date: date,
                    now: now,
                    day: day,
                    month: month
                }
            ]
        });
        const newJson = JSON.stringify(users);
        if (!newJson) {
            emitter.test();
            return res.status(404);
        }
        emitter.test(newJson);
        writeFileSync(Base, newJson);
        res.status(200).json(newJson);
    }
}
export const { addMess, getMess } = new Dialog();
