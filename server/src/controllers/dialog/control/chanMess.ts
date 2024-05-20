import { Request, Response } from "express";
import { Null, Type, IBody, IData, IMess, IMessage } from "../../../types/types.js";
import { User } from "../../../db/mongo.js";
import emitMess from "../emit.js";

export async function chanMess(req:Request,res:Response){
  if (!req.body){
    emitMess.test("chanMess");
    return res.status(400).json({
      message:"bad request"
    });
  }
  const {now,text}:IBody = req.body;
  const id1:number = Number(req.params.id);
  const id2:number = req.body.id;
  const item:Null<IData> = await User.findOne({id:id2});
  const mess:Null<IData> = await User.findOne({id:id1});
  if (!item || !mess){
    emitMess.test("chanMess");
    return res.status(404).json({
      message:`user1 : ${item},user2 : ${mess}`
    });
  }
  const dialog:Type<IMessage> = mess.message
  .find((i:IMessage)=>i.id == item.id);
  if (!dialog){
    emitMess.test("chanMess");
    return res.status(400).json({
      message:"dialog not found"
    });
  }

  const message:Type<IMess> = dialog.mess
  .find((i:IMess)=>i.now == now);
  if (!message){
    emitMess.test("chanMess");
    return res.status(400).json({
      message:"dialog mess not found"
    });
  }
  message.text = text;
  await User.findOneAndUpdate({id:id1},{
    message:mess.message
  },{new:true});

  return res.status(200).json(mess);
}