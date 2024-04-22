import { IData } from "../../../types.js";
import { Request, Response } from "express";
import { User } from "../../../mongo.js";
import emitUser from "../emit.js";

export async function getUsers(_:Request,res:Response):Promise<void>{
    const data:IData[] = await User.find();
    if (!data){
      emitUser.test('getUsers');
      res.status(400).json({
        message:"data not found"
      });
      return;
    }
    res.status(200).json(data);
}