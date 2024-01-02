import { Request, Response } from "express";
import { emitMess } from "../../classes/event.js";
import { Null, Type, body, data, message } from "../../types.js";
import { User } from "../../mongo.js";

export async function addMess(req:Request,res:Response):Promise<void>{
    if (!req.body){
      emitMess.test("addMess");
      res.status(400).json({
        message:"bad request"
      });
      return;
    };
    const {text,date,now,day,month}:body = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const item:Null<data> = await User.findOne({id:id2});
    const mess:Null<data> = await User.findOne({id:id1});
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
    await User.findOneAndUpdate({id:id1},
    {message:mess.message},{new:true});
    res.status(201).json(mess);
  };