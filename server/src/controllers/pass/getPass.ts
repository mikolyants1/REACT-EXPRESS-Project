import { Request, Response } from "express";
import { readFileSync } from "fs";
import bc from 'bcrypt';
import jwt from 'jsonwebtoken'
import { emitPass } from "../../classes/event.js";
import { Type, data, has } from "../../types.js";
import { Base } from "../../server.js";
import { User } from "../../mongo.js";


export async function getPass({body}: Request, res: Response): Promise<void> {
   const users: data[] = await User.find();
   if (!body) {
     res.sendStatus(404);
     emitPass.test("getPass");
     return;
   }
   const user: Type<data> = users.find((i: data) => (
    i.name == body.name && bc.compare(body.pass, i.pass)
   ));
   let token:string = "";
   if (user){
    token = jwt.sign({id:user.id},"secret_key_1",{expiresIn:"3d"});
   }; 
   const has: has = {
     id: user ? user.id : -1,
     has: Boolean(user),
     auth: token
   };
   res.status(200).json(has);
 }