import express, { Router } from 'express'
import {addMess,getMess} from './DialogControl.js'
import { check,validMess } from './valid.js'

const router:Router = express.Router()

router.post('/:id',validMess,check,addMess)

router.get('/:id',getMess)

export default router