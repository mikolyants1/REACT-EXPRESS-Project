import express, { Router } from 'express'
import  {validUser,check } from '../middlewares/valid.js'
import { Auth } from '../middlewares/Auth.js';
import { chanUser } from '../controllers/user/control/chanUser.js';
import { delUser } from '../controllers/user/control/delUser.js';
import { getUser } from '../controllers/user/control/getUser.js';
import { addUser } from '../controllers/user/control/addUser.js';
import { getUsers } from '../controllers/user/control/getUsers.js';

const router:Router = express.Router();
 
 router.put('/:id',validUser,check,Auth,chanUser);

 router.delete('/:id',Auth,delUser);
 
 router.get('/:id',getUser);

 router.post('/',validUser,check,addUser);

 router.get('/',getUsers);

export default router