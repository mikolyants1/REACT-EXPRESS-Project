import { Request, Response } from "express";
import bc from 'bcrypt'
import { Null,IData } from "../../../types/types.js";
import { User } from "../../../db/mongo.js";
import emitUser from "../emit.js";

export async function chanUser(req:Request,res:Response){
  if (!req.body){
    emitUser.test("chanUser");
    return res.status(400).json({
      message:"bad request"
    });
  }
  const id:number = Number(req.params.id);
  const user:Null<IData> = await User.findOne({id:id});
  const name:string = req.body.name;
  const reqPass:string = req.body.pass;
  const salt:string = await bc.genSalt(10);
  const crypt:string = await bc.hash(reqPass,salt);
  if (!user){
    emitUser.test("chanUser");
    return res.status(400).json({
      message:"user not found"
    });
  }
  await User.findOneAndUpdate({id:id},{
    name:name,
    pass:crypt
  },{new:true});
  user.name = name;
  const {pass,...resUser} = user;
  return res.status(200).json(resUser);
}