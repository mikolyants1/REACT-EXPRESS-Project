import { Request, Response } from "express";
import { IData } from "../../../types/types.js";
import { User } from "../../../db/mongo.js";
import bc from 'bcrypt'
import emitUser from "../emit.js";

export async function addUser(req:Request,res:Response){
  if (!req.body){
    emitUser.test("addUser");
    return res.status(400).json({
      message:"bad request"
    });
  }
  const name:string = req.body.name;
  const pass:string = req.body.pass;
  const users:IData[] = await User.find();
  const salt:string = await bc.genSalt(10);
  const crypt:string = await bc.hash(pass,salt);
  const userId:number = users.length ? users
  .sort((x:IData,y:IData)=>y.id - x.id)[0].id + 1 : 0;
  const user:IData = {
    id:userId,
    name:name,
    pass:crypt,
    message:[]
  }
  const newUser = new User(user);
  await newUser.save();
  const data:Omit<IData,"pass"> = {
    id:newUser.id,
    name,
    message:[]
  }
  return res.status(201).json(data);
}