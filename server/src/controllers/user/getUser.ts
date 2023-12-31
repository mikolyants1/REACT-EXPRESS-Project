import { Request, Response } from "express";
import { emitUser } from "../../classes/event.js";
import { User } from "../../mongo.js";


export default async (req:Request,res:Response):Promise<void>=>{
    const id:number = Number(req.params.id);
    const user = await User.findOne({id:id});
    if (!user){
      emitUser.test('getUser');
      res.status(404).json({
        message:"user not found"
      });
      return;
    };
    res.status(200).json(user);
 };