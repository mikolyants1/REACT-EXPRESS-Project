import { Request, Response } from "express";
import { emitMess } from "../../classes/event.js";
import { readFileSync, writeFileSync } from "fs";
import { Base } from "../../server.js";
import { Type, body, data, mess, message } from "../../types.js";

export default (req:Request,res:Response):void=>{
    if (!req.body){
      emitMess.test("delMess");
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
      emitMess.test("delMess");
      res.status(404).json({
        message:`user1 : ${item},user2 : ${mess}`
      });
      return;
     };
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id);
    if (!dialog){
        res.status(404).json({
         message:"dialog not found"
        });
        return;
       }
    const idx = dialog.mess.findIndex((i:mess)=>i.now == now);
    if (!idx){
     res.status(404).json({
      message:"dialog mess not found"
     });
     return;
    }
    dialog.mess.splice(idx,1);
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
   };