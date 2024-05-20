import { Request, Response } from "express";
import { IData } from "../../../types/types.js";
import { User } from "../../../db/mongo.js";
import emitUser from "../emit.js";

export async function delUser(req:Request,res:Response){
  const id:number = Number(req.params.id);
  const users:IData[] = await User.find();
  const idx:number = users.findIndex((i:IData)=>i.id == id);
  if (idx == -1) {
    emitUser.test('delUser');
    return res.status(400).json({
      message:"user not found"
    });
  }
  await User.findOneAndDelete({id:id});
  const newUsers:IData[] = users
  .filter((_:IData,i:number)=>i !== idx);
  return res.status(200).json(newUsers);
}