import express, { Router } from 'express'
import { check,validMess } from '../middlewares/valid.js'
import { addMess } from '../controllers/dialog/control/addMess.js';
import { chanMess } from '../controllers/dialog/control/chanMess.js';
import { delMess } from '../controllers/dialog/control/delMess.js';
import { Auth } from '../middlewares/Auth.js';

const router:Router = express.Router();

router.route('/:id')
.post(validMess,check,Auth,addMess)
.put(validMess,check,Auth,chanMess)
.delete(delMess);

export default router