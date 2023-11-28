import express, { Router } from 'express'
import {getUser,getUsers,addUser,chanUser, delUser} from './UserControl.js'
import  {validUser,check, validPhone} from './valid.js'

const router:Router = express.Router()
 
 router.put('/:id',validPhone,check,chanUser)

 router.delete('/:id',delUser)
 
 router.get('/:id',getUser)

 router.post('/',validUser,check,addUser)

router.post('/')

 router.get('/',getUsers)

export default router