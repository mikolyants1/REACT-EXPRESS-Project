import { readFileSync } from "fs";
import { Base } from "../../server.js";
import { data } from "../../types.js";
import { emitUser } from "../../classes/event.js";
import { Request, Response } from "express";



export default (_:Request,res:Response):void=>{
    const data:string = readFileSync(Base,'utf-8');
    const newData:data[] = JSON.parse(data);
    if (!data){
      emitUser.test('getUsers');
      res.status(404).json({
        message:"data not found"
      });
      return;
      };
    res.status(200).json(newData);
    };