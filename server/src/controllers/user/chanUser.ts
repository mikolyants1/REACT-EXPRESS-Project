import { Request, Response } from "express";
import { emitUser } from "../../classes/event.js";
import bc from 'bcrypt'
import { readFileSync, writeFileSync } from "fs";
import { Base } from "../../server.js";
import { Type, data } from "../../types.js";

export default (req:Request,res:Response):void=>{
    if (!req.body){
      emitUser.test("chanUser");
      res.status(400).json({
       message:"bad request"
      });
     return;
    };
    const id:number = Number(req.params.id);
    const name:string = req.body.name;
    const pass:string = req.body.pass;
    const salt:string = bc.genSaltSync(10);
    const crypt:string = bc.hashSync(pass,salt);
    const data:string = readFileSync(Base,'utf-8');
    const users:data[] = JSON.parse(data);
    const item:Type<data> = users.find((i:data)=>i.id==id);
    if (!item){
      emitUser.test("chanUser");
     res.status(404).json({
      message:"user not found"
     });
     return;
    };
    item.name = name;
    item.pass = crypt;
    const newJson:string = JSON.stringify(users);
    writeFileSync(Base,newJson);
    res.status(200).json(newJson);
    };