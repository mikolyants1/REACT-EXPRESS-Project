import { Request, Response } from "express";
import { User } from "../../../mongo.js";
import emitUser from "../emit.js";
import { IData, Null } from "../../../types.js";

export async function getUser(req:Request,res:Response):Promise<void>{
    const id:number = Number(req.params.id);
    const user:Null<IData> = await User.findOne({id:id});
    if (!user){
      emitUser.test('getUser');
      res.status(400).json({
        message:"user not found"
      });
      return;
    };
    res.status(200).json(user);
 };