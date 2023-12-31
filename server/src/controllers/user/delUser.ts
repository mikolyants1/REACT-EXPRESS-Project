import { Request, Response } from "express";
import { data } from "../../types.js";
import { emitUser } from "../../classes/event.js";
import { User } from "../../mongo.js";

export default async (req:Request,res:Response):Promise<void>=>{
    const id:number = Number(req.params.id);
    const users:data[] = await User.find();
    const index:number = users.findIndex((i:data)=>i.id==id);
    if (!index) {
      emitUser.test('delUser');
      res.status(404).json({
        message:"user not found"
      });
      return;
    };
    await User.findOneAndDelete({id:id});
    users.splice(index,1);
    res.status(200).json(users);
    };