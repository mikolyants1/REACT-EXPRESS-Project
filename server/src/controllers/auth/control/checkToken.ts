import { Request, Response } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import { Str } from "../../../types/types.js";
import emitPass from "../emit.js";

export async function checkToken(req:Request,res:Response) {
  if (!req.body){
    emitPass.test("checkToken");
    return res.status(400).json({
      message:"bad request"
    });
  }
  const {token,id} = req.body;
  const decoded:Str<JwtPayload> = jwt.verify(token,"secret_key_1");
  if (typeof decoded == "string"){
    emitPass.test("checkToken");
    return res.status(401).json({
      message:"inccorect token"
    });
  }
  return res.status(200).json({
    isValid:decoded.id == id
  });
}