import { Request,Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base, Type, data, mess, message } from './server.js'
import Emitter from './event.js'

interface body{
    id1:string,
    id2:string,
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }

const emitter = new Emitter('dialogCheck');

 class Dialog {
  getMess(req:Request,res:Response){
    const data:string = readFileSync(Base,'utf-8');
    const users:data[] = JSON.parse(data);
    const id:number = Number(req.params.id);
    const user:Type<data> = users.find((i:data)=>i.id==id);
    if (!user){
      emitter.test("getMess");
      return res.status(404);
    };
    return res.status(200).json(user);
  };
  addMess(req:Request,res:Response){
    if (!req.body) return res.status(404);
    const data:string = readFileSync(Base,'utf-8');
    const {text,date,now,day,month}:body = req.body;
    const id1:string = req.params.id;
    const id2:string = req.body.id;
    const users:data[] = JSON.parse(data);
    const item:Type<data> = users.find((i:data)=>i.phone==id2);
    const mess:Type<data> = users.find((i:data)=>i.phone==id1);
    if (!item||!mess) return res.status(404);
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    dialog ? dialog.mess.push({
      text:text,
      date:date,
      now:now,
      day:day,
      month:month
      }) : mess.message.push({ 
          id:item.id,
          mess:[
              {
                text:text,
                date:date,
                now:now,
                day:day,
                month:month
              }
          ]
      });
    const newJson:string = JSON.stringify(users);
    if (!newJson){
      emitter.test("addMess");
      return res.status(404);
      };
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
  };
  chanMess(req:Request,res:Response){
   if (!req.body) return res.status(404);
   const data:string = readFileSync(Base,"utf-8");
   const {now,text}:body = req.body;
   const id1:string = req.params.id;
   const id2:string = req.body.id;
   const users:data[] = JSON.parse(data);
   const item:Type<data> = users.find((i:data)=>i.phone==id2);
   const mess:Type<data> = users.find((i:data)=>i.phone==id1);
   if (!item||!mess) return res.status(404);
   const dialog:Type<message> = mess.message
   .find((i:message)=>i.id==item.id);
   const message = dialog?.mess.find((i:mess)=>i.now == now);
   if (!message) return res.status(404);
   message.text = text;
   const newJson:string = JSON.stringify(users);
   if (!newJson){
     emitter.test("chanMess");
     return res.status(404);
     } ;
   writeFileSync(Base,newJson);
   res.status(200).json(newJson);
  };
  delMess(req:Request,res:Response){
    if (!req.body) return res.status(404);
    const data:string = readFileSync(Base,"utf-8");
    const {now}:body = req.body;
    const id1:string = req.params.id;
    const id2:string = req.body.id;
    const users:data[] = JSON.parse(data);
    const item:Type<data> = users.find((i:data)=>i.phone==id2);
    const mess:Type<data> = users.find((i:data)=>i.phone==id1);
    if (!item||!mess) return res.status(404);
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    const idx = dialog?.mess.findIndex((i:mess)=>i.now == now);
    if (!idx) return res.status(404);
    dialog?.mess.splice(idx,1);
    const newJson:string = JSON.stringify(users);
    if (!newJson){
      emitter.test("chanMess");
      return res.status(404);
      } ;
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