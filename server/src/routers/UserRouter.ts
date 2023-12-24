import express, { Router } from 'express'
import  {validUser,check } from '../middlewares/valid.js'
import Auth from '../middlewares/Auth.js';
import chanUser from '../controllers/user/chanUser.js';
import delUser from '../controllers/user/delUser.js';
import getUser from '../controllers/user/getUser.js';
import addUser from '../controllers/user/addUser.js';
import getUsers from '../controllers/user/getUsers.js';

const router:Router = express.Router();
 
 router.put('/:id',validUser,check,Auth,chanUser);

 router.delete('/:id',delUser);
 
 router.get('/:id',getUser);

 router.post('/',validUser,check,addUser);

 router.get('/',getUsers);

export default router