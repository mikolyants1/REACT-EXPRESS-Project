import { readFileSync, writeFileSync } from 'fs';
import { Base } from './server.js';
class User {
    getUsers(req, res) {
        const data = readFileSync(Base, 'utf-8');
        console.log(data);
        const newData = JSON.parse(data);
        res.status(200).json(newData);
    }
    getUser(req, res) {
        const data = readFileSync(Base, 'utf-8');
        const users = JSON.parse(data);
        const id = req.params.id;
        const user = users.find((i) => i.phone == id);
        if (!user)
            return res.status(404);
        res.status(200).json(user);
    }
    addUser(req, res) {
        if (!req.body)
            return res.status(404);
        const data = readFileSync(Base, 'utf-8');
        const name = req.body.name;
        const phone = req.body.phone;
        const users = JSON.parse(data);
        const sortId = [...users]
            .sort((x, y) => y.id - x.id)[0].id;
        const id = users.length !== 0 ? sortId : 0;
        const user = {
            id: id + 1,
            name: name,
            phone: phone,
            message: []
        };
        const newArr = [...users, user];
        const newJson = JSON.stringify(newArr);
        writeFileSync(Base, newJson);
        res.status(200).json(newJson);
    }
    delUser(req, res) {
        const id = Number(req.params.id);
        const data = readFileSync(Base, 'utf-8');
        const users = JSON.parse(data);
        const newArr = users.filter((i) => i.id !== id);
        const newJson = JSON.stringify(newArr);
        writeFileSync(Base, newJson);
        res.status(200).json(newJson);
    }
    chanUser(req, res) {
        if (!req.body)
            return res.status(404);
        const id = Number(req.params.id);
        const name = req.body.name;
        const phone = req.body.phone;
        const data = readFileSync(Base, 'utf-8');
        const users = JSON.parse(data);
        const index = users.findIndex((i) => i.id == id);
        const item = users.find((i) => i.id == id);
        const left = users.slice(0, index);
        const right = users.slice(index + 1);
        if (!item)
            return res.status(404);
        const user = Object.assign(Object.assign({}, item), { id: id, name: name, phone: phone });
        const newArr = [...left, user, ...right];
        const newJson = JSON.stringify(newArr);
        writeFileSync(Base, newJson);
        res.status(200).json(newJson);
    }
}
export const { getUser, getUsers, chanUser, delUser, addUser } = new User();
