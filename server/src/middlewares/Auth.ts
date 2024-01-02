import { NextFunction, Request, Response } from "express";
import { Str, Type } from "../types.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export function Auth (req:Request,res:Response,next:NextFunction):void{
  const header:Type<string> = req.headers.authorization;
  if (!header){
    res.status(404).json({
      message:"incorrect header"
    });
    return;
  };
  const token:string = header.replace("Bearer","").trim();
  if (!token){
    res.status(403).json({
     message:"token not found"
    });
    return;
  }; 
  const decoded:Str<JwtPayload> = jwt.verify(token,"secret_key_1");
  if (typeof decoded == "string"){
    res.status(403).json({
      message:"inccorect verify"
    });
    return;
  };
  if (!Number(req.params.id) === decoded.id){
    res.status(404).json({
      message:"different id"
    });
    return;
  };
  next();
}