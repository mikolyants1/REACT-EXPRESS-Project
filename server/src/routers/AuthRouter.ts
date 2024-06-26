import express, { Router } from "express";
import { validUser,check } from "../middlewares/valid.js";
import { getPass } from "../controllers/auth/control/getPass.js";
import { checkToken } from "../controllers/auth/control/checkToken.js";

const router:Router = express.Router();

router.post('/token',checkToken);

router.post("/",validUser,check,getPass);

export default router