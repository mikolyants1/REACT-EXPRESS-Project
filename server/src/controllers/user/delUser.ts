import { Request, Response } from "express";
import { readFileSync, writeFileSync } from "fs";
import { data } from "../../types.js";
import { Base } from "../../server.js";
import { emitUser } from "../../classes/event.js";

export default (req:Request,res:Response):void=>{
    const id:number = Number(req.params.id);
    const data:string = readFileSync(Base,'utf-8');
    const users:data[] = JSON.parse(data);
    const idx:number = users.findIndex((i:data)=>i.id==id);
    if (!idx){
      emitUser.test('delUser');
      res.status(404).json({
        message:"user not found"
      });
      return;
      };
    users.splice(idx,1);
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
    };