import { Request, Response } from "express";
import { readFileSync } from "fs";
import { Base } from "../server.js";
import { Type, data, has} from "../types.js";
import bc from 'bcrypt';
import Emitter from "../classes/event.js";

const emitter:Emitter = new Emitter("pass");

function getPass(req:Request,res:Response):void{
 const data:string = readFileSync(Base,"utf-8");
 const users:data[] = JSON.parse(data);
 if (!req.query.name||!req.query.pass){
    res.sendStatus(404);
    emitter.test("getPass");
    return;
 }
 const name:string = req.query.name.toString();
 const pass:string = req.query.pass.toString();
 const user:Type<data> = users.find((i:data)=>(
    i.name == name && bc.compare(pass,i.pass)
  ));
  const has:has = {
    id: typeof user !=="undefined" ? user.id : -1,
    has:Boolean(user)
  }
  console.log(has)
  res.status(200).json(has)
}

export default getPass