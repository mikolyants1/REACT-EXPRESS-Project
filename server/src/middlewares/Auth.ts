import { NextFunction, Request, Response } from "express";
import { Type } from "../types";
import jwt, { JwtPayload } from "jsonwebtoken";

export default (req:Request,res:Response,next:NextFunction):void=>{
  const header:Type<string> = req.headers.authorization;

  if (!header){
    res.status(404).json({
        message:"incorrect header"
    });
    return;
  }
  const token:string = header.replace("Bearer","").trim();
  if (!token){
    res.status(403).json({
     message:"token not found"
    });
    return;
  }
  const decoded:string|JwtPayload = jwt.verify(token,"secret_key_1");
  if (typeof decoded == "string"){
    res.status(403).json({
        message:"inccorecr verify"
    });
    return;
  }
  if (!Number(req.params.id) === decoded.id){
    res.sendStatus(404);
    return;
  }
  next();
}