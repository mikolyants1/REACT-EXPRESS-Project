import express, { Router } from 'express'
import {getUser,getUsers,addUser,chanUser, delUser} from './UserControl.js'
import  {validUser,check, validPass} from './valid.js'

const router:Router = express.Router()
 
 router.put('/:id',validPass,check,chanUser)

 router.delete('/:id',delUser)
 
 router.get('/:id',getUser)

 router.post('/',validUser,check,addUser)

 router.get('/',getUsers)

export default router