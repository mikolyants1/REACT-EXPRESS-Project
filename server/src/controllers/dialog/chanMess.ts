import { Request, Response } from "express";
import { emitMess } from "../../classes/event.js";
import { Null, Type, body, data, mess, message } from "../../types.js";
import { User } from "../../mongo.js";

export async function chanMess(req:Request,res:Response):Promise<void>{
    if (!req.body){
     emitMess.test("chanMess");
     res.status(400).json({
       message:"bad request"
     });
     return;
    };
    const {now,text}:body = req.body;
    const id1:number = Number(req.params.id);
    const id2:number = req.body.id;
    const item:Null<data> = await User.findOne({id:id2});
    const mess:Null<data> = await User.findOne({id:id1});
    if (!item||!mess){
     emitMess.test("chanMess");
     res.status(404).json({
       message:`user1 : ${item},user2 : ${mess}`
     });
     return;
    };
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id == item.id);
    if (!dialog){
     emitMess.test("chanMess");
     res.status(404).json({
       message:"dialog not found"
     });
     return;
    };
    const message:Type<mess> = dialog.mess
    .find((i:mess)=>i.now == now);
    if (!message){
     emitMess.test("chanMess");
     res.status(404).json({
       message:"dialog mess not found"
     });
     return;
    };
    message.text = text;
    await User.findOneAndUpdate({id:id1},
    {message:mess.message},{new:true})
    res.status(200).json(mess);
   };