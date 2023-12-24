import { Request, Response } from "express";
import { emitMess } from "../../classes/event.js";
import { readFileSync, writeFileSync } from "fs";
import { Base } from "../../server.js";
import { Type, body, data, message } from "../../types.js";

export default (req:Request,res:Response):void=>{
    if (!req.body){
      emitMess.test("addMess");
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
      emitMess.test("addMess");
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