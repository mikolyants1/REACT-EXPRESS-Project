import { Request, Response } from "express";
import { emitUser } from "../../classes/event.js";
import { data } from "../../types.js";
import { readFileSync, writeFileSync } from "fs";
import { Base } from "../../server.js";
import bc from 'bcrypt'

export default async (req:Request,res:Response):Promise<void>=>{
    if (!req.body){
      emitUser.test("addUser");
      res.status(400).json({
       message:"bad request"
      });
     return;
    };
    const data:string = readFileSync(Base,'utf-8');
    const name:string = req.body.name;
    const pass:string = req.body.pass;
    const users:data[] = JSON.parse(data);
    const sortId:data[] = users.sort((x:data,y:data)=>y.id-x.id);
    const id:number = users.length !== 0 ? sortId[0].id : 0;
    const salt:string = await bc.genSalt(10);
    const crypt:string = await bc.hash(pass,salt);
    const user:data = {
      id:id+1,
      name:name,
      pass:crypt,
      message:[]
    }
    users.push(user); 
    const newJson:string = JSON.stringify(users);
    const {pass:p,...info}:data = user;
    writeFileSync(Base,newJson);
    res.status(200).json(info);
    };