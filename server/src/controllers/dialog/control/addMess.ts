import { Request, Response } from "express";
import { Null, Type, IData, IMessage, INewMess } from "../../../types.js";
import { User } from "../../../mongo.js";
import emitMess from "../emit.js";

export async function addMess(req:Request,res:Response):Promise<void>{
    if (!req.body){
      emitMess.test("addMess");
      res.status(400).json({
        message:"bad request"
      });
      return;
    };
    const {text,date,now,day,month}:INewMess = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const item:Null<IData> = await User.findOne({id:id2});
    const mess:Null<IData> = await User.findOne({id:id1});
    if (!item||!mess){
      emitMess.test("addMess");
      res.status(400).json({
        message:`user1 : ${item},user2 : ${mess}`
      });
      return;
    }
    const dialog:Type<IMessage> = mess.message
    .find((i:IMessage)=>i.id==item.id);
    const newMess:Omit<INewMess,"id"> = {
      text,date,now,day,month
    };
    dialog ? dialog.mess.push(newMess) : mess
    .message.push({id:item.id,mess:[newMess]});
    await User.findOneAndUpdate({id:id1},
    {message:mess.message},{new:true});
    res.status(201).json(mess);
  };