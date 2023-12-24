import { Request, Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base } from '../server.js'
import Emitter from '../classes/event.js'
import { Type, data } from '../types.js'
import jwt from "jsonwebtoken"
import bc from 'bcrypt'

const emitter:Emitter = new Emitter('userCheck');

class User {
    getUsers(_:Request,res:Response):void{
      const data:string = readFileSync(Base,'utf-8');
      const newData:data[] = JSON.parse(data);
      if (!data){
        emitter.test('getUsers');
        res.status(404).json({
          message:"data not found"
        });
        return;
        };
      res.status(200).json(newData);
      };
    getUser(req:Request,res:Response):void{
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const id:number = Number(req.params.id);
      const user:Type<data> = users.find((i:data)=>i.id==id);
      if (!user){
        emitter.test('getUser');
        res.status(404).json({
          message:"user not found"
        });
        return;
        };
      res.status(200).json(user);
      };
   async addUser(req:Request,res:Response):Promise<void>{
      if (!req.body){
        emitter.test("addUser");
        res.status(400).json({
         message:"bad request"
        });
       return;
      };
      const data:string = readFileSync(Base,'utf-8');
      const name:string = req.body.name;
      const pass:string = req.body.pass;
      const users:data[] = JSON.parse(data);
      const sortId:data[] = users.sort((x:data,y:data)=>y.id-x.id);
      const id:number = users.length !== 0 ? sortId[0].id : 0;
      const salt:string = await bc.genSalt(10);
      const crypt:string = await bc.hash(pass,salt);
      const user:data = {
        id:id+1,
        name:name,
        pass:crypt,
        message:[]
      }
      users.push(user); 
      const newJson:string = JSON.stringify(users);
      const {pass:p,...info}:data = user;
      writeFileSync(Base,newJson);
      res.status(200).json(info);
      };
    delUser(req:Request,res:Response):void{
      const id:number = Number(req.params.id);
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const idx:number = users.findIndex((i:data)=>i.id==id);
      if (!idx){
        emitter.test('delUser');
        res.status(404).json({
          message:"user not found"
        });
        return;
        };
      users.splice(idx,1);
      const newJson:string = JSON.stringify(users);
      writeFileSync(Base,newJson);
      res.status(200).json(newJson);
      };
    chanUser(req:Request,res:Response):void{
      if (!req.body){
        emitter.test("chanUser");
        res.status(400).json({
         message:"bad request"
        });
       return;
      };
      const id:number = Number(req.params.id);
      const name:string = req.body.name;
      const pass:string = req.body.pass;
      const salt:string = bc.genSaltSync(10);
      const crypt:string = bc.hashSync(pass,salt);
      const data:string = readFileSync(Base,'utf-8');
      const users:data[] = JSON.parse(data);
      const item:Type<data> = users.find((i:data)=>i.id==id);
      if (!item){
        emitter.test("chanUser");
       res.status(404).json({
        message:"user not found"
       });
       return;
      };
      item.name = name;
      item.pass = crypt;
      const newJson:string = JSON.stringify(users);
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