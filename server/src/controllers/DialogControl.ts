import { Request,Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base} from '../server.js'
import Emitter from '../classes/event.js'
import { Type, body, data, mess, message } from '../types.js'

const emitter:Emitter = new Emitter('dialogCheck');

class Dialog {
  getMess(req:Request,res:Response):void{
    const data:string = readFileSync(Base,'utf-8');
    const users:data[] = JSON.parse(data);
    const id:number = Number(req.params.id);
    const user:Type<data> = users.find((i:data)=>i.id==id);
    if (!user||!id){
      emitter.test("getMess");
      res.status(404).json({
        message:"user not found"
      });
      return;
    };
    res.status(200).json(user);
  };
  addMess(req:Request,res:Response):void{
    if (!req.body){
      emitter.test("addMess");
      res.status(400).json({
        message:"bad request"
      });
      return;
    };
    const data:string = readFileSync(Base,'utf-8');
    const {text,date,now,day,month}:body = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const users:data[] = JSON.parse(data);
    const item:Type<data> = users.find((i:data)=>i.id==id2);
    const mess:Type<data> = users.find((i:data)=>i.id==id1);
    if (!item||!mess){
      emitter.test("addMess");
      res.status(404).json({
        message:`user1 : ${item},user2 : ${mess}`
      });
      return;
    }
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    const newMess:Omit<body,"id1"|"id2"> = {
      text:text,
      date:date,
      now:now,
      day:day,
      month:month
    };
    dialog ? dialog.mess.push(newMess) : mess
    .message.push({id:item.id,mess:[newMess]});
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(201).json(newJson);
  };
  chanMess(req:Request,res:Response):void{
   if (!req.body){
    res.status(400).json({
      message:"bad request"
    });
    return;
   };
   const data:string = readFileSync(Base,"utf-8");
   const {now,text}:body = req.body;
   const id1:number = Number(req.params.id);
   const id2:number = req.body.id;
   const users:data[] = JSON.parse(data);
   const item:Type<data> = users.find((i:data)=>i.id==id2);
   const mess:Type<data> = users.find((i:data)=>i.id==id1);
   if (!item||!mess){
    emitter.test("chanMess");
    res.status(404).json({
      message:`user1 : ${item},user2 : ${mess}`
    });
    return;
   };
   const dialog:Type<message> = mess.message
   .find((i:message)=>i.id==item.id);
   const message = dialog?.mess.find((i:mess)=>i.now == now);
   if (!message){
    emitter.test("chanMess");
    res.status(404).json({
      message:"dialog not found"
    });
    return;
   };
   message.text = text;
   const newJson:string = JSON.stringify(users);
   writeFileSync(Base,newJson);
   res.status(200).json(newJson);
  };
  delMess(req:Request,res:Response):void{
    if (!req.body){
      emitter.test("delMess");
      res.status(400).json({
        message:"bad request"
      });
      return;
    };
    const data:string = readFileSync(Base,"utf-8");
    const {now}:body = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const users:data[] = JSON.parse(data);
    const item:Type<data> = users.find((i:data)=>i.id==id2);
    const mess:Type<data> = users.find((i:data)=>i.id==id1);
    if (!item||!mess){
      emitter.test("delMess");
      res.status(404).json({
        message:`user1 : ${item},user2 : ${mess}`
      });
      return;
     };
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    const idx = dialog?.mess.findIndex((i:mess)=>i.now == now);
    if (!idx){
     res.status(404).json({
      message:"dialog mess not found"
     });
     return;
    }
    dialog?.mess.splice(idx,1);
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
   };
};
export const {
    addMess,
    getMess,
    chanMess,
    delMess
 } = new Dialog()