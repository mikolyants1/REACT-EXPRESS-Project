
import { data } from "../../types.js";
import { emitUser } from "../../classes/event.js";
import { Request, Response } from "express";
import { User } from "../../mongo.js";

export default async (_:Request,res:Response):Promise<void>=>{
    const data:data[] = await User.find();
    if (!data){
      emitUser.test('getUsers');
      res.status(404).json({
        message:"data not found"
      });
      return;
      };
    res.status(200).json(data);
    };