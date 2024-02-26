import { Request, Response } from "express";
import { IData } from "../../../types.js";
import { User } from "../../../mongo.js";
import emitUser from "../emit.js";

export async function delUser(req:Request,res:Response):Promise<void>{
    const id:number = Number(req.params.id);
    const users:IData[] = await User.find();
    const idx:number = users.findIndex((i:IData)=>i.id == id);
    if (idx == -1) {
      emitUser.test('delUser');
      res.status(400).json({
        message:"user not found"
      });
      return;
    };
    await User.findOneAndDelete({id:id});
    const newUsers:IData[] = users
    .filter((_:IData,i:number)=>i !== idx);
    res.status(200).json(newUsers);
    };