import { Request, Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base } from '../server.js'
import Emitter from '../classes/event.js'
import { Type, data } from '../types.js'

const emitter:Emitter = new Emitter('userCheck')

class User {
    getUsers(_:Request,res:Response){
      const data:string = readFileSync(Base,'utf-8');
      const newData:data[] = JSON.parse(data);
      if (!data){
        emitter.test('getUsers');
        return res.status(404);
        };
      res.status(200).json(newData);
      };
    getUser(req:Request,res:Response){
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const id:number = Number(req.params.id);
      const user:Type<data> = users.find((i:data)=>i.id==id);
      if (!user){
        emitter.test('getUser');
        return res.status(404);
        };
      res.status(200).json(user);
      };
    addUser(req:Request,res:Response){
      if (!req.body) return res.status(404);
      const data:string = readFileSync(Base,'utf-8');
      const name:string = req.body.name;
      const pass:string = req.body.pass;
      const users:data[] = JSON.parse(data);
      const sortId:data[] = users.sort((x:data,y:data)=>y.id-x.id);
      const id:number = users.length !== 0 ? sortId[0].id : 0;
      users.push({id:id+1,name:name,pass:pass,message:[]});
      const newJson:string = JSON.stringify(users);
      if (!newJson){
        emitter.test('addUser');
        return res.status(404);
        };
      writeFileSync(Base,newJson);
      res.status(200).json(newJson);
      };
    delUser(req:Request,res:Response){
      const id:number = Number(req.params.id);
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const idx:number = users.findIndex((i:data)=>i.id==id);
      users.splice(idx,1);
      const newJson:string = JSON.stringify(users);
      if (!newJson){
        emitter.test('delUser');
        return res.status(404);
        };
      writeFileSync(Base,newJson);
      res.status(200).json(newJson);
      };
    chanUser(req:Request,res:Response){
      if (!req.body) return res.status(404);
      const id:number = Number(req.params.id);
      const name:string = req.body.name;
      const pass:string = req.body.pass;
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const item:Type<data> = users.find((i:data)=>i.id==id);
      if (!item) return res.status(404);
      item.name = name;
      item.pass = pass;
      const newJson:string = JSON.stringify(users);
      if (!newJson){
        emitter.test('chanUser');
        return res.status(404);
        };
      writeFileSync(Base,newJson);
      res.status(200).json(newJson);
      };
  };
export const {
    getUser,
    getUsers,
    chanUser,
    delUser,
    addUser
  } = new User();