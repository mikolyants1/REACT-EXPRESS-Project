import express, { Router } from "express";
import { validUser,check } from "../middlewares/valid.js";
import { getPass } from "../controllers/pass/getPass.js";

const router:Router = express.Router();

router.post("/",validUser,check,getPass);

export default router