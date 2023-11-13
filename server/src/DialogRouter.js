import express from 'express';
import { addMess, getMess } from './DialogControl.js';
import { check, validMess } from './valid.js';
const router = express.Router();
router.post('/:id', validMess, check, addMess);
router.get('/:id', getMess);
export default router;
