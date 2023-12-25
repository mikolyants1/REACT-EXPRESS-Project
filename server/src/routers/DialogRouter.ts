import express, { Router } from 'express'
import { check,validMess } from '../middlewares/valid.js'
import addMess from '../controllers/dialog/addMess.js';
import chanMess from '../controllers/dialog/chanMess.js';
import delMess from '../controllers/dialog/delMess.js';
import getMess from '../controllers/dialog/getMess.js';
import Auth from '../middlewares/Auth.js';

const router:Router = express.Router();

router.post('/:id',validMess,check,Auth,addMess);

router.put("/:id",validMess,check,Auth,chanMess);

router.delete("/:id",delMess);

router.get('/:id',getMess);

export default router