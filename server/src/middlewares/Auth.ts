import { NextFunction, Request, Response } from "express";
import { Str, Type } from "../types/types.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export function Auth(req:Request,res:Response,next:NextFunction){
  const header:Type<string> = req.headers.authorization;
  if (!header){
    res.status(401).json({
      message:"incorrect header"
    });
    return;
  }
  const token:string = header.replace("Bearer","").trim();
  if (!token){
    return res.status(401).json({
     message:"token not found"
    });
  } 
  const decoded:Str<JwtPayload> = jwt.verify(token,"secret_key_1");
  if (typeof decoded == "string"){
    return res.status(401).json({
      message:"inccorect verify"
    });
  }
  if (!Number(req.params.id) === decoded.id){
    return res.status(401).json({
      message:"different id"
    });
  }
  next();
}