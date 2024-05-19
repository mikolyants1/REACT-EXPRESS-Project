import { Request, Response } from "express";
import { Null, Type, IBody, IData, IMess, IMessage } from "../../../types/types.js";
import { User } from "../../../db/mongo.js";
import emitMess from "../emit.js";

export async function delMess(req:Request,res:Response):Promise<void>{
    if (!req.body){
      emitMess.test("delMess");
      res.status(400).json({
        message:"bad request"
      });
      return;
    }
    const {now}:IBody = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const item:Null<IData> = await User.findOne({id:id2});
    const mess:Null<IData> = await User.findOne({id:id1});
    if (!item||!mess){
      emitMess.test("delMess");
      res.status(404).json({
        message:`user1 : ${item},user2 : ${mess}`
      });
      return;
     }
    const dialog:Type<IMessage> = mess.message
    .find((i:IMessage)=>i.id == item.id);
    if (!dialog){
     emitMess.test("delMess");
     res.status(400).json({
       message:"dialog not found"
      });
      return;
    }
    const idx:number = dialog.mess
    .findIndex((i:IMess)=>i.now == now);
    if (idx==-1){
     res.status(404).json({
      message:"dialog mess not found"
     });
     return;
    }
    dialog.mess = dialog.mess.filter((i:IMess)=>i.now!==now);
    await User.findOneAndUpdate({id:id1},{
      message:mess.message
    },{new:true});
    res.status(200).json(mess);
   }