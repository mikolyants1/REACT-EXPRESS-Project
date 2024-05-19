import {body,validationResult,Result,ValidationError,
ValidationChain} from 'express-validator'
import { Request,Response,NextFunction } from 'express'

export const validUser:ValidationChain[] = [
  body('name')
  .notEmpty()
  .isLength({min:2}),
  body('pass')
  .notEmpty()
  .isLength({min:2})
   ];
export const validMess:ValidationChain[] = [
  body('text')
  .notEmpty()
  .isLength({min:2}),
  body('id')
  .notEmpty()
  .isNumeric()
  ];
  
export function check(req:Request,res:Response,next:NextFunction){
  const err:Result<ValidationError> = validationResult(req);
  if (!err.isEmpty()){
    res.status(400).json({
      error:err.array()
    });
    return;
  }
  next();
}
