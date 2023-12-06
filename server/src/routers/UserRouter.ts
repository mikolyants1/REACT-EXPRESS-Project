import express, { Router } from 'express'
import {getUser,getUsers,addUser,
chanUser, delUser} from '../controllers/UserControl.js'
import  {validUser,check } from '../valid.js'

const router:Router = express.Router()
 
 router.put('/:id',validUser,check,chanUser)

 router.delete('/:id',delUser)
 
 router.get('/:id',getUser)

 router.post('/',validUser,check,addUser)

 router.get('/',getUsers)

export default router