import {body,validationResult,Result,ValidationError,
ValidationChain} from 'express-validator'
import { Request,Response,NextFunction } from 'express'

export const validUser:ValidationChain[] = [
  body('name').notEmpty(),
  body('pass').isLength({min:2})
   ];
export const validMess:ValidationChain[] = [
  body('text').notEmpty(),
  body('id').notEmpty()
  ];
  
export function check(req:Request,res:Response,next:NextFunction){
 const err:Result<ValidationError> = validationResult(req);
 if (!err.isEmpty()){
  return res.status(404).json({
    error:err.array()
  });
 }; 
 next()
}
