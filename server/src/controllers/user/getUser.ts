import { Request, Response } from "express";
import { readFileSync } from "fs";
import { Base } from "../../server.js";
import { Type, data } from "../../types.js";
import { emitUser } from "../../classes/event.js";


export default (req:Request,res:Response):void=>{
    const data:string = readFileSync(Base,'utf-8');
    const users:data[] = JSON.parse(data);
    const id:number = Number(req.params.id);
    const user:Type<data> = users.find((i:data)=>i.id==id);
    if (!user){
      emitUser.test('getUser');
      res.status(404).json({
        message:"user not found"
      });
      return;
      };
    res.status(200).json(user);
    };