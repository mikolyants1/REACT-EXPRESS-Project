import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { Base } from "../../server.js";
import { emitMess } from "../../classes/event.js";
import { Type, body, data, mess, message } from "../../types.js";

export default (req:Request,res:Response):void=>{
    if (!req.body){
     emitMess.test("chanMess");
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
     emitMess.test("chanMess");
     res.status(404).json({
       message:`user1 : ${item},user2 : ${mess}`
     });
     return;
    };
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    if (!dialog){
        emitMess.test("chanMess");
        res.status(404).json({
          message:"dialog not found"
        });
        return;
       };
    const message = dialog.mess.find((i:mess)=>i.now == now);
    if (!message){
     emitMess.test("chanMess");
     res.status(404).json({
       message:"dialog mess not found"
     });
     return;
    };
    message.text = text;
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
   };