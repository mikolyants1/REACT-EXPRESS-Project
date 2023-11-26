import express, { Router } from 'express'
import {addMess,chanMess,getMess} from './DialogControl.js'
import { check,validMess } from './valid.js'

const router:Router = express.Router()

router.post('/:id',validMess,check,addMess)

router.put("/:id",validMess,check,chanMess)

router.get('/:id',getMess)

export default router