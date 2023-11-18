import { Request,Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base, Type, data, message } from './server.js'
import Emitter from './event.js'

interface body{
    id1:string,
    id2:string,
    text:string,
    date:string,
    now:number,
    day:number,
    month:string
  }

const emitter = new Emitter('dialogCheck')

 class Dialog {
  getMess(req:Request,res:Response){
    const data:string = readFileSync(Base,'utf-8')
    const users:data[] = JSON.parse(data)
    const id:number = Number(req.params.id)
    const user:Type<data> = users.find((i:data)=>i.id==id)
    if (!user){
      emitter.test()
      return res.status(404)
    } else {
      emitter.test(data)
      return res.status(200).json(user)
    }
  }
  addMess(req:Request,res:Response){
    if (!req.body) return res.status(404)
    const data:string = readFileSync(Base,'utf-8')
    const {text,date,now,day,month}:body = req.body
    const id1:string = req.params.id
    const id2:string = req.body.id
    const users:data[] = JSON.parse(data)
    const item:Type<data> = users.find((i:data)=>i.phone==id2)
    const mess:Type<data> = users.find((i:data)=>i.phone==id1)
    if (!item||!mess) return res.status(404)
    const dialog:Type<message> = mess.message
    .find((i:message)=>i.id==item.id)
    dialog ? dialog.mess.push({
      text:text,
      date:date,
      now:now,
      day:day,
      month:month
      }) : mess.message.push({ 
          id:item.id,
          mess:[
              {
                text:text,
                date:date,
                now:now,
                day:day,
                month:month
              }
          ]
      })
    const newJson:string = JSON.stringify(users)
    if (!newJson){
      emitter.test()
      return res.status(404)
      } 
    emitter.test(newJson)
    writeFileSync(Base,newJson)
    res.status(200).json(newJson)
  }
}
export const {
    addMess,
    getMess
 } = new Dialog()