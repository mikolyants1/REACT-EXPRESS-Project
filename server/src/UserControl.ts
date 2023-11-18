import { Request, Response } from 'express'
import {readFileSync,writeFileSync} from 'fs'
import { Base, Type, data } from './server.js'
import Emitter from './event.js'

const emitter:Emitter = new Emitter('userCheck')

class User {
    getUsers(req:Request,res:Response):void{
        const data:string = readFileSync(Base,'utf-8')
        const newData:data[] = JSON.parse(data)
        emitter.test(data)
        res.status(200).json(newData)
      }
    getUser(req:Request,res:Response){
        const data:string = readFileSync(Base,'utf-8')
        const users:data[] = JSON.parse(data)
        const id:string = req.params.id
        const user:Type<data> = users.find((i:data)=>i.phone==id)
        if (!user){
         emitter.test()
         return res.status(404)
         } else {
         emitter.test(data)
         return res.status(200).json(user)
         }
      }
    addUser(req:Request,res:Response){
        if (!req.body) return res.status(404)
        const data:string = readFileSync(Base,'utf-8')
        const name:string = req.body.name
        const phone:string = req.body.phone
        const users:data[] = JSON.parse(data)
        const sortId:number = [...users]
        .sort((x:data,y:data)=>y.id-x.id)[0].id
        const id:number = users.length !== 0 ? sortId : 0
        const user:data = {
            id:id+1,
            name:name,
            phone:phone,
            message:[]
        }
        const newArr:data[] = [ ...users,user]
        const newJson:string = JSON.stringify(newArr)
        if (newJson){
          emitter.test()
          return res.status(404)
        }
        emitter.test(newJson)
        writeFileSync(Base,newJson)
        res.status(200).json(newJson)
      }
    delUser(req:Request,res:Response){
        const id:number = Number(req.params.id)
        const data:string = readFileSync(Base,'utf-8')
        const users:data[] = JSON.parse(data)
        const newArr:data[] = users.filter((i:data)=>i.id!==id)
        const newJson:string = JSON.stringify(newArr)
        if (newJson){
          emitter.test()
          return res.status(404)
        }
        emitter.test(newJson)
        writeFileSync(Base,newJson)
        res.status(200).json(newJson)
      }
    chanUser(req:Request,res:Response){
        if (!req.body) return res.status(404)
        const id:number = Number(req.params.id)
        const name:string = req.body.name
        const phone:string = req.body.phone
        const data:string = readFileSync(Base,'utf-8')
        const users:data[] = JSON.parse(data)
        const index:number = users.findIndex((i:data)=>i.id==id)
        const item:Type<data> = users.find((i:data)=>i.id==id)
        const left:data[] = users.slice(0,index)
        const right:data[] = users.slice(index+1)
        if (!item) return res.status(404)
        const user:data = {
          ...item,
          id:id,
          name:name,
          phone:phone,
        }
        const newArr:data|data[] = [ ...left, user, ...right]
        const newJson:string = JSON.stringify(newArr)
        if (newJson){
          emitter.test()
          return res.status(404)
        }
        emitter.test(newJson)
        writeFileSync(Base,newJson)
        res.status(200).json(newJson)
      }
  
}
export const {
    getUser,
    getUsers,
    chanUser,
    delUser,
    addUser
  } = new User()