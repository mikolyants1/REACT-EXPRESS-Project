import { Request, Response } from "express";
import { emitUser } from "../../classes/event.js";
import { data } from "../../types.js";
import { User } from "../../mongo.js";
import bc from 'bcrypt'

export async function addUser(req:Request,res:Response):Promise<void>{
    if (!req.body){
      emitUser.test("addUser");
      res.status(400).json({
       message:"bad request"
      });
     return;
    };
    const name:string = req.body.name;
    const pass:string = req.body.pass;
    const users:data[] = await User.find();
    const salt:string = await bc.genSalt(10);
    const crypt:string = await bc.hash(pass,salt);
    const userId:number = users.length ? users
    .sort((x:data,y:data)=>y.id - x.id)[0].id+1 : 0;
    const user:data = {
      id:userId,
      name:name,
      pass:crypt,
      message:[]
    }
    const newUser = new User(user);
    await newUser.save();
    const data:Omit<data,"pass"> = {
      id:newUser.id,
      name:name,
      message:[]
    };
    res.status(200).json(data);
    };